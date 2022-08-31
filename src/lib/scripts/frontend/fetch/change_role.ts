import type { Role } from '@prisma/client';

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

	if (response.status !== 200) {
		throw new Error(await response.text());
	}
}
