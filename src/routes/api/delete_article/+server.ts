import { validate_get_admin_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/db/prisma_client';
import { json } from '@sveltejs/kit';
import type { JsonObject } from 'type-fest';
import { z } from 'zod';
import type { RequestHandler } from './$types';

export const post: RequestHandler = async ({ request }) => {
	const { id } = await validate_get_admin_body(
		request,
		z.object({
			id: z.string()
		})
	);

	await prisma_client.article.delete({
		where: {
			id
		}
	});
	return json({} as JsonObject);
};
