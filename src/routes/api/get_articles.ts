import { get_request_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/prisma_client';
import { is_filter, type article_preview_data } from '$lib/scripts/universal/datatypes';
import type { RequestHandler } from '@sveltejs/kit';
import type { Jsonify } from 'type-fest';

export const post: RequestHandler<
	Record<string, never>,
	| {
			articles: Jsonify<article_preview_data[]>;
	  }
	| {
			error: string;
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
	const query = filter.search
		? {
				search: filter.search
					.split(' ')
					.filter(Boolean)
					.map((word) => `${word}`)
					.join(' & ')
		  }
		: undefined;

	const response = await prisma_client.article.findMany({
		where: query
			? {
					OR: [
						{
							content: query
						},
						{
							title: query
						}
					]
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
	return {
		body: {
			articles: response.map((article) => ({
				...article,
				createdAt: JSON.stringify(article.createdAt)
			}))
		},
		status: 200
	};
};
