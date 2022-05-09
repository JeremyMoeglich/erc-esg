import { prisma_client } from '$lib/scripts/backend/prisma_client';
import type { category_data_type } from '$lib/scripts/universal/datatypes';
import { page_variants, type page_variant } from '$lib/scripts/universal/page_variants';
import type { RequestHandler } from '@sveltejs/kit';
import type { Jsonify } from 'type-fest';

export const get: RequestHandler<
	{ page_variant: string },
	Jsonify<{
		category_datas?: category_data_type[];
		error?: string;
	}>
> = async ({ params }) => {
	const { page_variant } = params;
	if (!page_variants.includes(page_variant as page_variant)) {
		return {
			status: 404
		};
	}
	try {
		const response = await prisma_client.pageVariant.findUnique({
			where: {
				name: page_variant
			},
			select: {
				categories: {
					select: {
						name: true,
						id: true,
						text: true,
						description: true,
						subcategories: {
							select: {
								name: true,
								id: true,
								text: true,
								description: true
							}
						}
					}
				}
			}
		});
		if (!response) {
			return {
				status: 404,
				body: {
					error: 'Page variant not found'
				}
			};
		}

		return {
			body: {
				category_datas: response.categories.map((category) => {
					return {
						id: category.id,
						name: category.name,
						description: category.description,
						text: category.text,
						subcategories: category.subcategories.map((subcategory) => {
							return {
								id: subcategory.id,
								name: subcategory.name,
								text: subcategory.text,
								description: subcategory.description
							};
						})
					};
				})
			},
			status: 200
		};
	} catch (error) {
		return {
			status: 500,
			body: {
				error: 'Internal server error (categories)'
			}
		};
	}
};
