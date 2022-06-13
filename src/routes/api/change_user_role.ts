import { validate_get_admin_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/prisma_client';
import { is_role } from '$lib/scripts/universal/datatypes';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler<
	Record<string, never>,
	{
		error?: string;
	}
> = async ({ request }) => {
	const body = await validate_get_admin_body(request, ['email', 'role']);
	if (body instanceof Error) {
		return {
			status: 401,
			body: {
				error: body.message
			}
		};
	}

	if (typeof body.email !== 'string' || typeof body.role !== 'string') {
		return {
			status: 400,
			body: {
				error: 'Field datatypes invalid'
			}
		};
	}

	if (!is_role(body.role)) {
		return {
			status: 400,
			body: {
				error: 'Invalid role'
			}
		};
	}

	const { email, role } = body;

	await prisma_client.user.update({
		where: {
			email
		},
		data: {
			role
		}
	});

	return {
		status: 200
	};
};
