import { validate_get_admin_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/prisma_client';
import { is_category_data_type } from '$lib/scripts/universal/datatypes';
import { idify } from '$lib/scripts/universal/idify';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler<
	Record<string, never>,
	{
		error?: string;
	}
> = async ({ request }) => {
	const body = await validate_get_admin_body(request, ['name', 'new_data']);
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
		!body.new_data ||
		!(typeof body.new_data === 'object') ||
		!is_category_data_type(body.new_data)
	) {
		return {
			status: 400,
			body: {
				error: 'Field datatypes invalid'
			}
		};
	}

	if (body.new_data.name !== idify(body.new_data.text)) {
		return {
			status: 400,
			body: {
				error: 'Category name must be the id version of the text'
			}
		};
	}

	await prisma_client.category.update({
		where: {
			name: body.name
		},
		data: {
			...body.new_data
		}
	});
	return {
		body: {},
		status: 200
	};
};
