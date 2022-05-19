import { validate_get_admin_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/prisma_client';
import { is_article } from '$lib/scripts/universal/datatypes';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler<
	Record<string, never>,
	{
		error?: string;
	}
> = async ({ request }) => {
	const body = await validate_get_admin_body(request, ['article']);
	if (body instanceof Error) {
		return {
			status: 401,
			body: {
				error: body.message
			}
		};
	}
	if (!is_article(body.article)) {
		return {
			status: 400,
			body: {
				error: 'Field datatypes invalid'
			}
		};
	}
	const { article } = body;

	prisma_client.article.upsert({
		where: {
			id: article.id
		},
		update: {
			title: article.title,
			content: article.content,
			imageLinkId: article.image_link.id
		},
		create: {
			id: article.id,
			title: article.title,
			content: article.content,
			imageLinkId: article.image_link.id
		}
	});

	return {
		status: 200
	};
};
