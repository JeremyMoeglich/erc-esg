import { get_auth_user_data } from '$lib/scripts/backend/endpoint_utils';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<
	Record<string, never>,
	{
		user_data?: {
			name: string;
			id: number;
			email: string;
			role: string;
		};
		error?: string;
	}
> = async ({ request }) => {
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
