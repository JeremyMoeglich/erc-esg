import { prisma_client } from '$lib/scripts/backend/db/prisma_client';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const images = await prisma_client.imageLink.findMany({
		where: {
			show_in_gallery: true
		},
		select: {
			id: true
		}
	});

	return json({
		images: images.map((image) => image.id)
	});
};
