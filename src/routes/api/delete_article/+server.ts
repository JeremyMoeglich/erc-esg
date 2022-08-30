import { validate_get_admin_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/prisma_client';
import type { RequestHandler } from './$types';

export const post: RequestHandler = async ({ request }) => {
	const body = await validate_get_admin_body(request, ['id']);
	if (body instanceof Error) {
		return {
			status: 401,
			body: {
				error: body.message
			}
		};
	}
	if (!body || !body.id || !(typeof body.id === 'string')) {
		return {
			status: 400,
			body: {
				error: 'Field datatypes invalid'
			}
		};
	}
	const { id } = body;

	await prisma_client.article.delete({
		where: {
			id
		}
	});
	return {
		status: 200
	};
};
