import { get_request_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/prisma_client';
import { is_contact_form } from '$lib/scripts/universal/datatypes';
import type { RequestHandler } from '@sveltejs/kit';
import cuid from 'cuid';

export const post: RequestHandler<Record<string, never>, { error?: string }> = async ({
	request
}) => {
	const body = await get_request_body(request, ['email', 'name', 'message']);
	if (!body) {
		return {
			body: {
				error: 'Missing email, password, or name'
			},
			status: 400
		};
	}
	if (!is_contact_form(body)) {
		return {
			body: {
				error: 'Invalid contact form'
			},
			status: 400
		};
	}
	const { email, name, message } = body;

	if (body?.id) {
		const response = await prisma_client.contactForm.findUnique({
			where: {
				id: body.id
			},
			select: {
				id: true
			}
		});
		if (response) {
			return {
				body: {
					error: 'Contact form already exists'
				},
				status: 400
			};
		}
	}
	const id = body.id ?? cuid();
	const createdAt = new Date().toISOString();
	const phone = body?.phone;

	await prisma_client.contactForm.create({
		data: {
			id,
			name,
			email,
			message,
			createdAt,
			phone
		}
	});

	return {
		body: {},
		status: 200
	};
};
