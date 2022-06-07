import { parse } from 'cookie';
import { hasProperty } from 'functional-utilities';
import type { user_data_type } from '../universal/datatypes';
import { prisma_client } from '$lib/scripts/backend/prisma_client';
import { has_db_access } from './has_db_access';

export function parse_body<T extends string>(
	body: string,
	attrs: T[]
): Record<T, unknown> | undefined {
	try {
		const content = JSON.parse(body.trim() ? body : '{}');
		if (typeof content !== 'object') {
			return undefined;
		}
		console.debug(content);
		attrs.forEach((attr) => {
			if (!hasProperty(content, attr)) {
				console.debug('Missing attribute', attr);
				return undefined;
			}
		});
		return content;
	} catch (error) {
		console.debug('parse_body error', body, attrs, typeof body);
		throw error;
	}
}

export async function get_request_body<T extends string>(
	request: Request,
	attrs: T[]
): Promise<Record<T, unknown> | undefined> {
	const decoded_body = await request.text();
	return parse_body(decoded_body, attrs);
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

export async function validate_get_admin_body<T extends string>(request: Request, attrs: T[]) {
	const body = await get_request_body(request, attrs);
	const user_data = await get_auth_user_data(request);
	if (user_data instanceof Error) {
		return user_data;
	}
	if (!has_db_access(user_data.role)) {
		return new Error('You do not have access to this endpoint');
	}
	if (!body) {
		return new Error('Missing required fields');
	}
	return body;
}
