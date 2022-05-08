import { validate_get_admin_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/prisma_client';
import { idify } from '$lib/scripts/universal/idify';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler<
	Record<string, never>,
	{
		error?: string;
		id?: number;
	}
> = async ({ request }) => {
	const body = await validate_get_admin_body(request, ['text', 'parent_id']);
	if (body instanceof Error) {
		return {
			status: 401,
			body: {
				error: body.message
			}
		};
	}
	if (
		!body.text ||
		!(typeof body.text === 'string') ||
		!body.parent_id ||
		!(typeof body.parent_id === 'number')
	) {
		return {
			status: 400,
			body: {
				error: 'Fields must be strings'
			}
		};
	}
	await prisma_client.subCategory.create({
		data: {
			text: body.text,
			description: 'leere Beschreibung',
			name: idify(body.text),
			category: {
				connect: {
					id: body.parent_id
				}
			},
			categoryId: body.parent_id
		}
	});
	return {
		body: {},
		status: 200
	};
};
