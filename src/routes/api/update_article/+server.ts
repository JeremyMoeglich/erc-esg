import { validate_get_admin_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/db/prisma_client';
import { article_schema } from '$lib/scripts/universal/datatypes';
import { json } from '@sveltejs/kit';
import type { JsonObject } from 'type-fest';
import { z } from 'zod';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { article } = await validate_get_admin_body(
		request,
		z.object({
			article: article_schema
		})
	);

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
			imageLinkId: article.image_link_id,
			hidden: article.hidden ?? false
		},
		create: {
			id: article.id,
			title: article.title,
			content: article.content,
			imageLinkId: article.image_link_id,
			createdAt: new Date(),
			hidden: article.hidden ?? false
		}
	});

	return json({} as JsonObject);
};
