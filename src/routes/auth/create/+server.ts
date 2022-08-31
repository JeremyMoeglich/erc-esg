import { get_request_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/db/prisma_client';
import type { RequestHandler } from './$types';
import pkg from 'bcryptjs';
const { hash } = pkg
import cuid from 'cuid';
import { z } from 'zod';
import { error, json } from '@sveltejs/kit';
import type { JsonObject } from 'type-fest';

export const POST: RequestHandler = async ({ request }) => {
	const { email, password, name } = await get_request_body(
		request,
		z.object({
			email: z.string().email(),
			name: z.string(),
			password: z.string()
		})
	);
	const user_exists = await prisma_client.user.findUnique({
		where: { email },
		select: { id: true }
	});
	if (user_exists) {
		throw error(400, 'Email already in use');
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
			value: cuid()
		}
	});
	return json({
		token: token.value
	} as JsonObject);
};
