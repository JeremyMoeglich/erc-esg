import { prisma_client } from '$lib/scripts/backend/prisma_client';
import { page_variants, type page_variant } from '$lib/scripts/universal/page_variants';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<
	{ page_variant: page_variant },
	{
		category_metadatas: {
			id: number;
			name: string;
		}[];
	}
> = async ({ params }) => {
	const { page_variant } = params;
	if (!page_variants.includes(page_variant)) {
		return {
			status: 404
		};
	}
	try {
		const response = await prisma_client.pageVariant
			.findUnique({
				where: {
					name: page_variant
				},
				select: {
					categories: {
						select: {
							name: true,
							id: true
						}
					}
				}
			})
			.categories();

		return {
			body: {
				category_metadatas: response.map((category) => {
					return {
						id: category.id,
						name: category.name
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
