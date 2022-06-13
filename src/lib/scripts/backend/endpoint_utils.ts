import { parse } from 'cookie';
import { hasProperty } from 'functional-utilities';
import type { user_data_type } from '../universal/datatypes';
import { prisma_client } from '$lib/scripts/backend/prisma_client';
import { has_db_access } from './has_db_access';
import type { JsonValue } from 'type-fest';

export async function get_request_body<T extends string>(
	request: Request,
	attrs: T[]
): Promise<Record<T, unknown> | undefined> {
	const body = await get_body(request);
	if (attrs.every((attr) => hasProperty(body, attr))) {
		return body as Record<T, unknown>;
	} else {
		return undefined;
	}
}

export async function get_body(request: Request): Promise<JsonValue | Error> {
	const decoded_body = await request.text();
	const body: JsonValue = JSON.parse(decoded_body.trim() ? decoded_body : '{}');
	if (typeof body !== 'object') {
		return new Error('Invalid body');
	}
	return body;
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

export async function validate_get_admin_body<T extends string>(request: Request, attrs: T[]) {
	const body = await get_request_body(request, attrs);
	if (!has_admin_access(request)) {
		return new Error('Not logged in');
	}
	if (!body) {
		return new Error('Missing required fields');
	}
	return body;
}
