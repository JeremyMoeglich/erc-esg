import { get_request_body, has_admin_access } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/prisma_client';
import { is_contact_form, type contact_form_type } from '$lib/scripts/universal/datatypes';
import type { ContactForm } from '@prisma/client';
import type { RequestHandler } from './$types';
import cuid from 'cuid';

export const post: RequestHandler = async ({ request }) => {
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

export const GET: RequestHandler = async ({ request }) => {
	if (!(await has_admin_access(request))) {
		return {
			body: {
				error: 'Unauthorized'
			},
			status: 401
		};
	}
	const contact_forms = await prisma_client.contactForm.findMany();
	return {
		body: {
			forms: contact_forms
		},
		status: 200
	};
};
