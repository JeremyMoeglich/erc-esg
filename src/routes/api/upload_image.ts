import { validate_get_admin_body } from '$lib/scripts/backend/endpoint_utils';
import { upload_image } from '$lib/scripts/backend/imagekit/upload_file';
import { prisma_client } from '$lib/scripts/backend/prisma_client';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler<
	Record<string, never>,
	| {
			image_url: string;
	  }
	| {
			error: string;
	  }
> = async ({ request }) => {
	const body = await validate_get_admin_body(request, ['id', 'image']);
	if (body instanceof Error) {
		return {
			status: 401,
			body: {
				error: body.message
			}
		};
	}
	if (typeof body.id !== 'string' || typeof body.image !== 'string') {
		return {
			status: 400,
			body: {
				error: 'Field datatypes invalid'
			}
		};
	}
	const { id, image } = body;

	const response = await upload_image(id, image);

	const url = response.url;

	prisma_client.imageLink.upsert({
		where: {
			id
		},
		create: {
			id,
			image_url: url
		},
		update: {
			image_url: url
		}
	});

	return {
		status: 200,
		body: {
			image_url: url
		}
	};
};
