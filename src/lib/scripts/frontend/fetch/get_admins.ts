import { is_user_of_role, type user_data_type } from '$lib/scripts/universal/datatypes';
import type { JSONValue } from '@sveltejs/kit/types/private';
import { hasProperty } from 'functional-utilities';

export async function get_admins() {
	const response = await fetch('/api/get_admins');
	const body: JSONValue = await response.json();
	if (hasProperty(body, 'error')) {
		if (typeof body.error !== 'string') {
			throw new Error('Invalid error message (not a string)');
		}
		throw new Error(body.error);
	}
	if (!hasProperty(body, 'admins')) {
		throw new Error('Invalid response (missing admins)');
	}
	if (!Array.isArray(body.admins)) {
		throw new Error('Invalid response (admins is not an array)');
	}
	const admins: unknown[] = body.admins;
	if (!admins.every((data): data is user_data_type<'admin'> => is_user_of_role(data, ['admin']))) {
		throw new Error('Invalid response (not an array of admins)');
	}
	return admins;
}
