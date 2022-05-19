import { prisma_client } from '$lib/scripts/backend/prisma_client';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<
	{ name: string },
	| {
			image_url: string;
	  }
	| {
			error: string;
	  }
> = async ({ params }) => {
	const { name } = params;
	try {
		const response = await prisma_client.imageLink
			.findUnique({
				where: {
					name
				},
				select: {
					image_url: true
				}
			})
			.catch(() => undefined);
		if (!response) {
			return {
				status: 200,
				body: {
					image_url: 'https://via.placeholder.com/300x300'
				}
			};
		}
		return {
			body: {
				image_url: response.image_url
			},
			status: 200
		};
	} catch (error) {
		return {
			status: 500,
			body: {
				error: 'Internal server error'
			}
		};
	}
};
