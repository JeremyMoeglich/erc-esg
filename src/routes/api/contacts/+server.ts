import { get_request_body, has_admin_access } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/db/prisma_client';
import type { RequestHandler } from './$types';
import cuid from 'cuid';
import { contact_form_schema } from '$lib/scripts/universal/datatypes';
import { error, json } from '@sveltejs/kit';
import type { JsonObject } from 'type-fest';

export const POST: RequestHandler = async ({ request }) => {
	const { email, name, message, id, phone } = await get_request_body(request, contact_form_schema);

	if (id) {
		const response = await prisma_client.contactForm.findUnique({
			where: {
				id
			},
			select: {
				id: true
			}
		});
		if (response) {
			throw error(400, 'Form already submitted');
		}
	}
	const createdAt = new Date().toISOString();

	await prisma_client.contactForm.create({
		data: {
			id: id ?? cuid(),
			name,
			email,
			message,
			createdAt,
			phone
		}
	});

	return json({} as JsonObject);
};

export const GET: RequestHandler = async ({ request }) => {
	if (!(await has_admin_access(request))) {
		throw error(403, 'Not authorized');
	}
	const contact_forms = await prisma_client.contactForm.findMany();

	return json({
		forms: contact_forms.map((v) => ({
			...v,
			createdAt: v.createdAt.toISOString()
		}))
	} as JsonObject);
};
