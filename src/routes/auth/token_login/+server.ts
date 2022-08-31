import { get_request_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/db/prisma_client';
import { error, json } from '@sveltejs/kit';
import type { JsonObject } from 'type-fest';
import { z } from 'zod';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { token } = await get_request_body(
		request,
		z.object({
			token: z.string()
		})
	);

	const loginToken = await prisma_client.loginToken.findUnique({
		where: { value: token },
		select: { userId: true, time: true }
	});
	if (!loginToken) {
		throw error(400, 'Invalid token');
	}
	if (loginToken.time.getTime() < Date.now() - 1000 * 60 * 60 * 24 * 7) {
		await prisma_client.loginToken.delete({
			where: { value: token }
		});
		throw error(400, 'Token expired');
	}
	return json({
		valid: true
	} as JsonObject);
};
