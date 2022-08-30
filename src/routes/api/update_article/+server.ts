import { validate_get_admin_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/prisma_client';
import { is_article } from '$lib/scripts/universal/datatypes';
import type { RequestHandler } from './$types';

export const post: RequestHandler = async ({ request }) => {
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

	await prisma_client.imageLink.upsert({
		where: {
			id: article.image_link_id
		},
		create: {
			id: article.image_link_id,
			image_url: 'https://ik.imagekit.io/p6h71lfbt/nutzungsverhalten_analyse_uQC0Zauvv'
		},
		update: {}
	});

	await prisma_client.article.upsert({
		where: {
			id: article.id
		},
		update: {
			title: article.title,
			content: article.content,
			imageLinkId: article.image_link_id
		},
		create: {
			title: article.title,
			content: article.content,
			imageLinkId: article.image_link_id,
			createdAt: new Date()
		}
	});

	return {
		status: 200
	};
};
