import { validate_get_admin_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/prisma_client';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler<
	Record<string, never>,
	{
		error?: string;
	}
> = async ({ request }) => {
	const body = await validate_get_admin_body(request, ['name', 'page_variant']);
	if (body instanceof Error) {
		return {
			status: 401,
			body: {
				error: body.message
			}
		};
	}
	if (
		!body.name ||
		!(typeof body.name === 'string') ||
		!body.page_variant ||
		!(typeof body.page_variant === 'string')
	) {
		return {
			status: 400,
			body: {
				error: 'Fields must be strings'
			}
		};
	}

	await prisma_client.category.delete({
		where: {
			name: body.name
		}
	});
	return {
		body: {},
		status: 200
	};
};
