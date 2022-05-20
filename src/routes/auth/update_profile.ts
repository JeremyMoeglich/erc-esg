import { get_auth_user_data, get_request_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/prisma_client';
import type { RequestHandler } from '@sveltejs/kit';
import { hash } from 'bcrypt';

export const post: RequestHandler<Record<string, never>, { error?: string }> = async ({
	request
}) => {
	const body = await get_request_body(request, ['email', 'password', 'name']);
	if (!body) {
		return {
			body: {
				error: 'Missing email, password, or name'
			},
			status: 400
		};
	}
	const { email, password, name } = body;
	if (!email || !password || !name) {
		return {
			body: {
				error: 'Missing email, password, or name'
			},
			status: 400
		};
	}
	if (typeof email !== 'string' || typeof password !== 'string' || typeof name !== 'string') {
		return {
			body: {
				error: 'Invalid email, password, or name'
			},
			status: 400
		};
	}
	const old_user_data = await get_auth_user_data(request);
	if (old_user_data instanceof Error) {
		return {
			body: {
				error: old_user_data.message
			},
			status: 401
		};
	}

	if (old_user_data.email !== email) {
		const user_exists = await prisma_client.user.findUnique({
			where: { email },
			select: { id: true }
		});
		if (user_exists) {
			return {
				body: {
					error: 'Email already used'
				},
				status: 409
			};
		}
	}

	const hashed_password = await hash(password, 10);
	prisma_client.user.update({
		where: {
			id: old_user_data.id
		},
		data: {
			email,
			password_hash: hashed_password,
			name
		}
	});
	return {
		body: {},
		status: 200
	};
};
