import { prisma_client } from '$lib/scripts/backend/db/prisma_client';
import { error, json } from '@sveltejs/kit';
import type { JsonObject } from 'type-fest';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const { id } = params;
	try {
		const response = await prisma_client.imageLink
			.findUnique({
				where: {
					id
				},
				select: {
					image_url: true
				}
			})
			.catch(() => undefined);
		if (!response) {
			return json({
				image_url: 'https://ik.imagekit.io/p6h71lfbt/nutzungsverhalten_analyse_uQC0Zauvv'
			});
		}
		return json({
			image_url: response.image_url
		} as JsonObject);
	} catch (e) {
		throw error(500, 'Internal server error');
	}
};
