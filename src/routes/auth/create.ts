import { prisma_client } from '$lib/scripts/backend/prisma_client';
import type { RequestHandler } from '@sveltejs/kit';
import { hash } from 'bcrypt';
import { v4 } from 'uuid';

export const post: RequestHandler<
	{ email: string; password: string; name: string },
	{ token?: string; error?: string }
> = async ({ params }) => {
	const { email, password, name } = params;
	if (!email || !password || !name) {
		return { error: 'Missing email, password or name' };
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
