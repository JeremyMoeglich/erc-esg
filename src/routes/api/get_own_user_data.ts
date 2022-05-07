import { prisma_client } from '$lib/scripts/backend/prisma_client';
import type { RequestHandler } from '@sveltejs/kit';
import { parse } from 'cookie';

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
	const cookies = parse(request.headers.get('cookie') ?? '');
	if (!cookies.login_token) {
		return {
			status: 403,
			body: {
				error: 'Not logged in'
			}
		};
	}
	const id = (
		await prisma_client.loginToken.findUnique({
			where: {
				value: cookies.login_token
			},
			select: {
				userId: true
			}
		})
	)?.userId;

	if (!id) {
		return {
			status: 403,
			body: {
				error: 'Not logged in'
			}
		};
	}

	const user = await prisma_client.user.findUnique({
		where: {
			id: id
		},
		select: {
			name: true,
			id: true,
			email: true,
			role: true
		}
	});

	if (!user) {
		prisma_client.loginToken.delete({
			where: {
				value: cookies.login_token
			}
		});
		return {
			status: 403,
			body: {
				error: 'Not logged in'
			}
		};
	}
	return {
		body: {
			user_data: user
		}
	};
};
