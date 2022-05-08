import { get_request_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/prisma_client';
import type { RequestHandler } from '@sveltejs/kit';
import { hash } from 'bcrypt';
import { v4 } from 'uuid';

export const post: RequestHandler<
	Record<string, never>,
	{ token?: string; error?: string }
> = async ({ request }) => {
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
	const user_exists = await prisma_client.user.findUnique({
		where: { email: email },
		select: { id: true }
	});
	if (user_exists) {
		return {
			body: {
				error: 'Email already registered'
			},
			status: 409
		};
	}
	const password_hash = await hash(password, 10);
	const user = await prisma_client.user.create({
		data: {
			email: email,
			password_hash: password_hash,
			name: name
		}
	});
	const token = await prisma_client.loginToken.create({
		data: {
			userId: user.id,
			value: v4()
		}
	});
	return {
		body: {
			token: token.value
		}
	};
};
