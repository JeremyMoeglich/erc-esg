import { get_request_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/prisma_client';
import { is_int } from '$lib/scripts/universal/validators';
import type { RequestHandler } from '@sveltejs/kit';
import { compare } from 'bcrypt';
import { v4 } from 'uuid';

export const post: RequestHandler<
	Record<string, never>,
	{ token?: string; error?: string }
> = async ({ request }) => {
	const body = await get_request_body(request, ['identifier', 'password']);
	if (!body) {
		return {
			body: {
				error: 'Missing identifier, password, or name'
			},
			status: 400
		};
	}
	const { identifier, password } = body;
	if (!identifier || !password) {
		return {
			body: {
				error: 'Missing identifier or password'
			},
			status: 400
		};
	}
	if (typeof identifier !== 'string' || typeof password !== 'string') {
		return {
			body: {
				error: 'Invalid identifier or password'
			},
			status: 400
		};
	}
	const userId = is_int(identifier)
		? parseInt(identifier)
		: (await prisma_client.user.findUnique({ where: { email: identifier }, select: { id: true } }))
				?.id;
	if (!userId) {
		return {
			body: {
				error: 'Invalid email or password'
			},
			status: 401
		};
	}
	const password_hash: string | undefined = (
		await prisma_client.user.findUnique({
			where: { id: userId },
			select: {
				password_hash: true
			}
		})
	)?.password_hash;

	if (!password_hash) {
		return {
			body: {
				error: 'Invalid identifier'
			},
			status: 404
		};
	}
	const is_valid = await compare(password, password_hash);
	if (!is_valid) {
		return {
			body: {
				error: 'Invalid password'
			},
			status: 401
		};
	}
	const current_token = await prisma_client.loginToken.findUnique({
		where: { userId: userId },
		select: { value: true, time: true }
	});
	if (current_token) {
		// check if token is newer than 1 week
		if (current_token.time.getTime() > Date.now() - 1000 * 60 * 60 * 24 * 7) {
			return {
				body: {
					token: current_token.value
				},
				status: 200
			};
		} else {
			await prisma_client.loginToken.delete({ where: { userId: userId } });
		}
	}
	const new_token = await prisma_client.loginToken.create({
		data: {
			userId: userId,
			value: v4()
		}
	});
	return {
		body: {
			token: new_token.value
		},
		status: 201
	};
};
