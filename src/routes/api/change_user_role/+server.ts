import { validate_get_admin_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/db/prisma_client';
import { role_schema } from '$lib/scripts/universal/datatypes';
import { json } from '@sveltejs/kit';
import type { JsonObject } from 'type-fest';
import { z } from 'zod';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { email, role } = await validate_get_admin_body(
		request,
		z.object({
			email: z.string(),
			role: role_schema
		})
	);

	await prisma_client.user.update({
		where: {
			email
		},
		data: {
			role
		}
	});

	return json({} as JsonObject);
};
