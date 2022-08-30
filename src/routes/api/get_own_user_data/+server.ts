import { get_auth_user_data } from '$lib/scripts/backend/endpoint_utils';
import type { user_data_type } from '$lib/scripts/universal/datatypes';
import type { RequestHandler } from './$types';
import type { Jsonify } from 'type-fest';

export const GET: RequestHandler = async ({ request }) => {
	const user_data = await get_auth_user_data(request);
	if (user_data instanceof Error) {
		return {
			status: 401,
			body: {
				error: user_data.message
			}
		};
	}
	return {
		body: {
			user_data
		}
	};
};
