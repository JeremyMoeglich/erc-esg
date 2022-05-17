import { validate_get_admin_body } from '$lib/scripts/backend/endpoint_utils';
import { upload_image } from '$lib/scripts/backend/imagekit/upload_file';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler<
	Record<string, never>,
	| {
			url: string;
	  }
	| {
			error: string;
	  }
> = async ({ request }) => {
	const body = await validate_get_admin_body(request, ['name', 'data_url']);
	if (body instanceof Error) {
		return {
			status: 401,
			body: {
				error: body.message
			}
		};
	}
	if (typeof body.name !== 'string' || typeof body.data_url !== 'string') {
		return {
			status: 400,
			body: {
				error: 'Field datatypes invalid'
			}
		};
	}
	const { name, data_url } = body;

	const response = await upload_image(name, data_url);

	return {
		status: 200,
		body: {
			url: response.url
		}
	};
};
