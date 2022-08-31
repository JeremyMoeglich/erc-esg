import { get_auth_user_data } from '$lib/scripts/backend/endpoint_utils';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
	const user_data = await get_auth_user_data(request);
	return json(user_data);
};
