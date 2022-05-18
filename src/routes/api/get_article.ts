import { get_request_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/prisma_client';
import type { imageLink } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';
import type { Jsonify } from 'type-fest';

export const post: RequestHandler<
	Record<string, never>,
	| {
			item: Jsonify<{
				id: string;
				title: string;
				createdAt: string;
				content: string;
				image_link: imageLink;
			}>;
	  }
	| {
			error: string;
	  }
> = async ({ request }) => {
	const body = await get_request_body(request, ['id']);
	if (body instanceof Error) {
		return {
			status: 401,
			body: {
				error: body.message
			}
		};
	}
	if (!body || !body.id || !(typeof body.id === 'string')) {
		return {
			status: 400,
			body: {
				error: 'Field datatypes invalid'
			}
		};
	}
	const { id } = body;
	try {
		const response = await prisma_client.article.findUnique({
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
						image_url: true,
						name: true
					}
				}
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
		const serialized_response = {
			...response,
			createdAt: JSON.stringify(response.createdAt)
		};
		return {
			body: {
				item: serialized_response
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
