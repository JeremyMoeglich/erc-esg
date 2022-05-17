import { prisma_client } from '$lib/scripts/backend/prisma_client';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler<
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
		const response = await prisma_client.imageLink.findUnique({
			where: {
				name
			},
			select: {
				image_url: true
			}
		});
		if (!response) {
			return {
				status: 404,
				body: {
					error: 'Item not found'
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
