import { get_request_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/db/prisma_client';
import { json } from '@sveltejs/kit';
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
	await prisma_client.loginToken.delete({
		where: { value: token }
	});
	return json({} as JsonObject);
};
