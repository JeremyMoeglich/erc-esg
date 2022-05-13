import { get_request_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/prisma_client';
import type { detailed_item_data_type } from '$lib/scripts/universal/datatypes';
import type { RequestHandler } from '@sveltejs/kit';
import type { Jsonify } from 'type-fest';

export const post: RequestHandler<
	Record<string, never>,
	{
		item?: Jsonify<detailed_item_data_type>;
		error?: string;
	}
> = async ({ request }) => {
	const body = await get_request_body(request, ['name']);
	if (body instanceof Error) {
		return {
			status: 401,
			body: {
				error: body.message
			}
		};
	}
	if (!body || !body.name || !(typeof body.name === 'string')) {
		return {
			status: 400,
			body: {
				error: 'Field datatypes invalid'
			}
		};
	}
	const { name } = body;
	try {
		const response = await prisma_client.item.findUnique({
			where: {
				name
			},
			select: {
				name: true,
				description: true,
				images: true,
				price: true,
				text: true,
				quantity: true
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
				items: response
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
