import { validate_get_admin_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/db/prisma_client';
import { json } from '@sveltejs/kit';
import type { JsonObject } from 'type-fest';
import { z } from 'zod';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { id, url, show_in_gallery } = await validate_get_admin_body(
		request,
		z.object({
			id: z.string(),
			url: z.string(),
			show_in_gallery: z.boolean().optional()
		})
	);

	await prisma_client.imageLink.upsert({
		where: {
			id
		},
		create: {
			id,
			image_url: url,
			show_in_gallery: show_in_gallery ?? false
		},
		update: {
			image_url: url,
			show_in_gallery: show_in_gallery ?? false
		}
	});

	return json({ success: true });
};
