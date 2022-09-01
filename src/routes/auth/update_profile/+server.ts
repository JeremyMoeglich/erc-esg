import { get_auth_user_data, get_request_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/db/prisma_client';
import type { RequestHandler } from './$types';
import pkg from 'bcryptjs';
const { hash } = pkg;
import { z } from 'zod';
import { error, json } from '@sveltejs/kit';
import type { JsonObject } from 'type-fest';

export const POST: RequestHandler = async ({ request }) => {
	const { email, password, name } = await get_request_body(
		request,
		z
			.object({
				email: z.string().email(),
				name: z.string(),
				password: z.string()
			})
			.partial()
	);

	const old_user_data = await get_auth_user_data(request);

	if (old_user_data.email !== email) {
		const user_exists = await prisma_client.user.findUnique({
			where: { email },
			select: { id: true }
		});
		if (user_exists) {
			throw error(400, 'Email already in use');
		}
	}

	prisma_client.user.update({
		where: {
			id: old_user_data.id
		},
		data: {
			...(name ? { name } : {}),
			...(email ? { email } : {}),
			...(password ? { password: await hash(password, 10) } : {})
		}
	});
	return json({} as JsonObject);
};
