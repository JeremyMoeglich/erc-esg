import type { Role } from '@prisma/client';
import { hasProperty } from 'functional-utilities';
import type { JsonValue } from 'type-fest';

export async function change_role(email: string, role: Role) {
	const response: Response = await fetch('/api/change_user_role', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email,
			role
		})
	});

	const body: JsonValue = await response.json();

	if (hasProperty(body, 'error')) {
		if (typeof body.error !== 'string') {
			throw new Error('Invalid error message');
		}
		throw new Error(body.error);
	}
}
