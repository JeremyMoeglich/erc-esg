import { get_request_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/db/prisma_client';
import type { RequestHandler } from './$types';
import { z } from 'zod';
import { error, json } from '@sveltejs/kit';
import type { JsonObject } from 'type-fest';

export const POST: RequestHandler = async ({ request }) => {
	const { id } = await get_request_body(
		request,
		z.object({
			id: z.string()
		})
	);
	try {
		const response = await prisma_client.article
			.findUnique({
				where: {
					id
				},
				select: {
					content: true,
					title: true,
					id: true,
					createdAt: true,
					image_link: {
						select: {
							id: true,
							image_url: true
						}
					}
				}
			})
			.catch(() => undefined);
		if (!response) {
			throw error(404, 'article not found');
		}
		const serialized_response = {
			...response,
			createdAt: JSON.stringify(response.createdAt)
		};
		return json({
			item: serialized_response
		} as JsonObject);
	} catch (e) {
		throw error(500, 'Internal server error');
	}
};
