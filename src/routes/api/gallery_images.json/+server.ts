import { prisma_client } from '$lib/scripts/backend/db/prisma_client';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const categories = await prisma_client.galeryCategory.findMany({
		where: {}
	});

	return json({
		images: categories
	});
};
