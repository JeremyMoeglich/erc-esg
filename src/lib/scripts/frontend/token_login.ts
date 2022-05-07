import type { JSONValue } from '@sveltejs/kit/types/private';
import { hasProperty } from 'functional-utilities';
import Cookies from 'js-cookie';
import { current_auth_state } from './auth_state';
import { is_user_data, user_data } from './user_data';

export async function check_token_and_login() {
	const token = Cookies.get('token');
	if (!token) {
		return;
	}
	try {
		await token_login(token);
	} catch (error) {
		if (error instanceof Error || error !== 'Invalid token') {
			throw error;
		}
	}
}

export async function token_login(token: string, validate = true) {
	if (validate) {
		const result = await fetch('/auth/token_login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ token })
		});
		const data: JSONValue = await result.json();
		if (!data) {
			throw new Error('Invalid response from server (expected truthy object)');
		}
		if (typeof data !== 'object') {
			throw new Error('Invalid response from server (expected object)');
		}
		if (hasProperty(data, 'error')) {
			if (typeof data.error !== 'string') {
				throw new Error('Invalid response from server (expected error to be string)');
			}
			throw new Error(data.error);
		}
		if (!hasProperty(data, 'valid')) {
			throw new Error('Invalid response from server (expected valid attribute)');
		}
		if (typeof data.valid !== 'string') {
			throw new Error('Invalid response from server (expected token to be string)');
		}
		const valid = data.valid;
		if (valid === 'false') {
			throw new Error('Invalid token');
		}
	}

	Cookies.set('login_token', token);
	const new_user_data: unknown = await (await fetch('/api/get_own_user_data')).json();
	if (!is_user_data(new_user_data)) {
		throw new Error('Invalid response from server (expected user data)');
	}
	user_data.set(new_user_data);
	current_auth_state.set(new_user_data.role);
}
