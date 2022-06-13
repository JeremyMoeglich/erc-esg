import type { ContactForm } from '@prisma/client';

export async function get_contacts(): Promise<ContactForm[]> {
	const response = await fetch('/api/contacts', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const body = await response.json();
	return body.forms;
}
