import { validate_get_admin_body } from '$lib/scripts/backend/endpoint_utils';
import { upload_image } from '$lib/scripts/backend/imagekit/upload_file';
import { prisma_client } from '$lib/scripts/backend/db/prisma_client';
import { json } from '@sveltejs/kit';
import type { JsonObject } from 'type-fest';
import { z } from 'zod';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { id, image, show_in_gallery } = await validate_get_admin_body(
		request,
		z.object({
			id: z.string(),
			image: z.string(),
			show_in_gallery: z.boolean().optional()
		})
	);

	const response = await upload_image(id, image);

	const url = response.url;

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

	return json({
		image_url: url
	} as JsonObject);
};
