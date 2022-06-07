import { validate_get_admin_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/prisma_client';
import type { user_data_type } from '$lib/scripts/universal/datatypes';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<
	Record<string, never>,
	| {
			error: string;
	  }
	| {
			admins: Array<user_data_type<'admin'>>;
	  }
> = async ({ request }) => {
	const body = await validate_get_admin_body(request, []);
	if (body instanceof Error) {
		return {
			status: 401,
			body: {
				error: body.message
			}
		};
	}

	const admins = await prisma_client.user.findMany({
		where: {
			role: 'admin'
		}
	});

	const admins_data: Array<user_data_type<'admin'>> = admins.map(({ id, email, name, tag }) => ({
		id,
		email,
		name,
		role: 'admin',
		tag
	}));

	return {
		status: 200,
		body: {
			admins: admins_data
		}
	};
};
