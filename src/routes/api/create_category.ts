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
	const body = await validate_get_admin_body(request, ['text', 'page_variant']);
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
	const id = (
		await prisma_client.category.create({
			data: {
				text: body.text,
				description: 'leere Beschreibung',
				name: idify(body.text),
				page_variants: {
					connect: {
						name: body.page_variant
					}
				}
			},
			select: {
				id: true
			}
		})
	).id;
	return {
		body: {
			id
		},
		status: 200
	};
};
