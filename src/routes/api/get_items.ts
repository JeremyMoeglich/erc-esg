import { get_request_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/prisma_client';
import { is_filter, type simple_item_data_type } from '$lib/scripts/universal/datatypes';
import type { RequestHandler } from '@sveltejs/kit';
import { hasProperty } from 'functional-utilities';
import type { Jsonify } from 'type-fest';

export const post: RequestHandler<
	Record<string, never>,
	{
		items?: Jsonify<simple_item_data_type[]>;
		error?: string;
	}
> = async ({ request }) => {
	const body = await get_request_body(request, ['start', 'end', 'filter']);
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
		typeof body.start !== 'number' ||
		typeof body.end !== 'number' ||
		!is_filter(body.filter)
	) {
		return {
			status: 400,
			body: {
				error: 'Field datatypes invalid'
			}
		};
	}
	const { start, end, filter } = body;

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
	const max_amount = 40;
	if (end - start > max_amount) {
		return {
			status: 403,
			body: {
				error: `maximum number of items is ${max_amount}`
			}
		};
	}
	if (start > 500) {
		return {
			status: 403,
			body: {
				error: 'start must be less than 500'
			}
		};
	}

	const subcategory_ids =
		hasProperty(filter, 'subcategory_id') && filter.subcategory_id
			? [filter.subcategory_id]
			: hasProperty(filter, 'category_id')
			? (
					await prisma_client.subCategory.findMany({
						where: {
							categoryId: filter.category_id
						},
						select: {
							id: true
						}
					})
			  ).map((v) => v.id)
			: undefined;
	try {
		const response = await prisma_client.item.findMany({
			where: subcategory_ids
				? {
						subcategoryId: {
							in: subcategory_ids
						}
				  }
				: undefined,
			skip: start,
			take: end - start,
			select: {
				description: true,
				id: true,
				price: true,
				name: true,
				text: true,
				images: true
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
