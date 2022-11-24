import { get_request_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/db/prisma_client';
import { filter_schema } from '$lib/scripts/universal/datatypes';
import type { RequestHandler } from './$types';
import { z } from 'zod';
import { error, json } from '@sveltejs/kit';
import type { JsonObject } from 'type-fest';

export const POST: RequestHandler = async ({ request }) => {
	const { start, end, filter } = await get_request_body(
		request,
		z.object({
			start: z.number().int().nonnegative(),
			end: z.number().int().nonnegative(),
			filter: filter_schema
		})
	);

	if (start > end) {
		throw error(400, 'start must be less than end');
	}
	const max_amount = 40;
	if (end - start > max_amount) {
		throw error(400, `end - start must be less than ${max_amount}`);
	}
	if (start > 500) {
		throw error(400, 'start must be less than 500');
	}

	const response = await prisma_client.article.findMany({
		where: filter.search
			? {
					OR: filter.search.split(' ').flatMap((word) => [
						{
							title: {
								contains: word
							}
						},
						{
							content: {
								contains: word
							}
						}
					])
			  }
			: undefined,
		skip: start,
		take: end - start,
		select: {
			title: true,
			id: true,
			createdAt: true,
			image_link: {
				select: {
					id: true,
					image_url: true
				}
			}
		},
		orderBy: {
			createdAt: 'desc'
		}
	});
	return json({
		articles: response.map((article) => ({
			...article,
			createdAt: JSON.stringify(article.createdAt)
		}))
	} as JsonObject);
};
