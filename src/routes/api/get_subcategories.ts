import { prisma_client } from '$lib/scripts/backend/prisma_client';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<
	{ category_name: string },
	{
		subcategory_metadatas: {
			id: number;
			name: string;
		}[];
	}
> = async ({ params }) => {
	const { category_name } = params;
	try {
		const response = await prisma_client.category
			.findUnique({
				where: {
					name: category_name
				},
				select: {
					subcategories: {
						select: {
							name: true,
							id: true
						}
					}
				}
			})
			.subcategories();
		return {
			body: {
				subcategory_metadatas: response.map((subcategory) => {
					return {
						id: subcategory.id,
						name: subcategory.name
					};
				})
			},
			status: 200
		};
	} catch (error) {
		return {
			status: 500
		};
	}
};
