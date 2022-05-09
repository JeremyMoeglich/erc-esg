import { get_request_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/prisma_client';
import { is_filter, type simple_item_data_type } from '$lib/scripts/universal/datatypes';
import type { RequestHandler } from '@sveltejs/kit';
import { map_values } from 'functional-utilities';

export const get: RequestHandler<
	Record<string, never>,
	{
		items?: simple_item_data_type[];
		error?: string;
	}
> = async ({ request }) => {
	const body = await get_request_body(request, ['name', 'start', 'end', 'filter']);
	if (body instanceof Error) {
		return {
			status: 401,
			body: {
				error: body.message
			}
		};
	}
	if (
		!body ||
		!body.name ||
		!(typeof body.name === 'string') ||
		!body.start ||
		!(typeof body.start === 'number') ||
		!body.end ||
		!(typeof body.end === 'number') ||
		!body.filter ||
		!is_filter(body.filter)
	) {
		return {
			status: 400,
			body: {
				error: 'Field datatypes invalid'
			}
		};
	}
	const { name, start, end, filter } = body;

	if (start > end) {
		return {
			status: 400,
			body: {
				error: 'start must be less than end'
			}
		};
	}
	if (start < 0 || end < 0) {
		return {
			status: 400,
			body: {
				error: 'start and end must be positive integers'
			}
		};
	}
	if (end - start > 100) {
		return {
			status: 403,
			body: {
				error: 'maximum number of items is 100'
			}
		};
	}
	try {
		let subcategory_id 
		const response = await prisma_client.item.findMany({
			where: {
				subcategoryId: subcategory_id
			},
			skip: start,
			take: end - start,
			select: {
				description: true,
				id: true,
				price: true,
				name: true,
				image: true
			}
		});
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
