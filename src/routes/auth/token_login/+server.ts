import { get_request_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/prisma_client';
import type { RequestHandler } from './$types';

export const post: RequestHandler = async ({ request }) => {
	const body = await get_request_body(request, ['token']);
	if (!body || !body.token || typeof body.token !== 'string') {
		return {
			body: {
				valid: false,
				error: 'Invalid request'
			}
		};
	}
	const { token } = body;
	const loginToken = await prisma_client.loginToken.findUnique({
		where: { value: token },
		select: { userId: true, time: true }
	});
	if (!loginToken) {
		return {
			body: {
				valid: false,
				error: 'Invalid token'
			},
			status: 401
		};
	}
	if (loginToken.time.getTime() < Date.now() - 1000 * 60 * 60 * 24 * 7) {
		return {
			body: {
				valid: false,
				error: 'Token expired'
			},
			status: 401
		};
	}
	return {
		body: {
			valid: true
		}
	};
};
