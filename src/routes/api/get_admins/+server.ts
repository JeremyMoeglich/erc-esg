import { has_admin_access } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/db/prisma_client';
import type { safe_user_data_type } from '$lib/scripts/universal/datatypes';
import { error, json } from '@sveltejs/kit';
import type { JsonObject } from 'type-fest';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request }) => {
	if (!(await has_admin_access(request))) {
		throw error(403, 'Not authorized');
	}
	const admins = await prisma_client.user.findMany({
		where: {
			role: 'admin'
		}
	});

	const admins_data: Array<safe_user_data_type<'admin'>> = admins.map(
		({ id, email, name, tag }) => ({
			id,
			email,
			name,
			role: 'admin',
			tag
		})
	);

	return json({
		admins_data
	} as JsonObject);
};
