import { prisma_client } from '$lib/scripts/backend/prisma_client';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler<{ token: string }, { valid: boolean; error?: string }> = async ({
	params
}) => {
	const { token } = params;
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
