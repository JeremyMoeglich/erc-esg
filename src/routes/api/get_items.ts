import { prisma_client } from '$lib/scripts/backend/prisma_client';
import type { RequestHandler } from '@sveltejs/kit';
import { map_values } from 'functional-utilities';

export const get: RequestHandler<
	{ subcategory_id: string; start: string; end: string },
	{
		items?: {
			description: string;
			id: number;
			price: number;
			name: string;
			image: string;
		}[];
		error?: string;
	}
> = async ({ params }) => {
	const { subcategory_id, start, end } = map_values(params, (v) => parseInt(v));
	if (!start || !end) {
		return {
			status: 400,
			body: {
				error: 'start and end must be integers'
			}
		};
	}
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
			status: 500
		};
	}
};
