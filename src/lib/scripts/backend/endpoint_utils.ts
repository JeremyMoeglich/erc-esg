import { parse } from 'cookie';
import type { user_data_type } from '../universal/datatypes';
import { prisma_client } from './db/prisma_client';
import type { JsonValue } from 'type-fest';
import type { z } from 'zod';
import type { ZodObjectAny } from '../universal/zod_util';
import { error } from '@sveltejs/kit';
import { has_db_access } from './has_db_access';

export async function get_request_body<T extends ZodObjectAny>(
	request: Request,
	schema: T
): Promise<z.infer<T>> {
	const body = await get_body(request);
	const parsed = schema.safeParse(body);
	if (parsed.success) {
		return parsed.data;
	} else {
		throw error(400, `Invalid request body: ${parsed.error.message}`);
	}
}

export async function get_body(request: Request): Promise<JsonValue> {
	const decoded_body = await request.text();
	try {
		const body: JsonValue = JSON.parse(decoded_body.trim() ? decoded_body : '{}');
		if (typeof body !== 'object') {
			throw error(400, 'Not an object');
		}
		return body;
	} catch (_) {
		throw error(400, 'Invalid JSON');
	}
}

export async function get_auth_user_data(request: Request): Promise<user_data_type | Error> {
	const cookies = parse(request.headers.get('cookie') ?? '');
	if (!cookies.login_token) {
		return new Error('Not logged in');
	}
	const user_id = (
		await prisma_client.loginToken.findUnique({
			where: {
				value: cookies.login_token
			},
			select: {
				userId: true
			}
		})
	)?.userId;

	if (!user_id) {
		return new Error('Invalid login token');
	}

	const user = await prisma_client.user.findUnique({
		where: {
			id: user_id
		},
		select: {
			name: true,
			id: true,
			email: true,
			role: true,
			tag: true
		}
	});

	if (!user) {
		await prisma_client.loginToken.delete({
			where: {
				value: cookies.login_token
			}
		});
		return new Error('Invalid login token');
	}
	return user;
}

export async function has_admin_access(request: Request): Promise<boolean> {
	const user = await get_auth_user_data(request);
	if (user instanceof Error) {
		return false;
	}
	return has_db_access(user.role);
}

export async function validate_get_admin_body<T extends ZodObjectAny>(request: Request, schema: T) {
	const body = await get_request_body(request, schema);
	if (!has_admin_access(request)) {
		throw error(403, 'Not authorized');
	}
	if (!body) {
		throw error(400, 'No body');
	}
	return body;
}
