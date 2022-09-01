import { get_request_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/db/prisma_client';
import type { RequestHandler } from './$types';
import pkg from 'bcryptjs';
const { compare } = pkg;
import cuid from 'cuid';
import { z } from 'zod';
import { error, json } from '@sveltejs/kit';
import type { JsonObject } from 'type-fest';

export const POST: RequestHandler = async ({ request }) => {
	const { email, password } = await get_request_body(
		request,
		z.object({
			email: z.string().email(),
			password: z.string()
		})
	);

	const userId = (await prisma_client.user.findUnique({ where: { email }, select: { id: true } }))
		?.id;

	if (!userId) {
		throw error(400, 'Invalid email or password');
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
		throw error(500, 'Could not find password hash');
	}
	const is_valid = await compare(password, password_hash);
	if (!is_valid) {
		throw error(400, 'Invalid email or password');
	}
	const current_token = await prisma_client.loginToken.findUnique({
		where: { userId: userId },
		select: { value: true, time: true }
	});
	if (current_token) {
		// check if token is newer than 1 week
		if (current_token.time.getTime() > Date.now() - 1000 * 60 * 60 * 24 * 7) {
			return json({
				token: current_token.value
			} as JsonObject);
		} else {
			await prisma_client.loginToken.delete({ where: { userId: userId } });
		}
	}
	const new_token = await prisma_client.loginToken.create({
		data: {
			userId: userId,
			value: cuid()
		}
	});
	return json({
		token: new_token.value
	} as JsonObject);
};
