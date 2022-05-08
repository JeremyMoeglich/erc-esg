import { get_request_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/prisma_client';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ request }) => {
	const body = await get_request_body(request, ['token']);
	if (!body || !body.token || typeof body.token !== 'string') {
		return {
			status: 400
		};
	}
	const { token } = body;
	await prisma_client.loginToken.delete({
		where: { value: token }
	});
	return {
		status: 200
	};
};
