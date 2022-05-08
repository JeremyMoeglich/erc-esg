import type { JSONValue } from '@sveltejs/kit/types/private';
import { hasProperty } from 'functional-utilities';
import { current_auth_state } from './auth_state';
import { get_login_token, remove_login_token, set_login_token } from './login_token';
import { user_datas_store } from '../data/user_data';
import { is_user_data } from '$lib/scripts/universal/datatypes';

export async function check_token_and_login() {
	const token = get_login_token();
	if (!token) {
		return;
	}
	try {
		await token_login(token);
	} catch (error) {
		if (error instanceof Error && error.message !== 'Invalid token') {
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
		}).catch((v) => v);
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
			if (data.error === 'Invalid token') {
				remove_login_token();
			}
			throw new Error(data.error);
		}
		if (!hasProperty(data, 'valid')) {
			throw new Error('Invalid response from server (expected valid attribute)');
		}
		if (typeof data.valid !== 'boolean') {
			throw new Error('Invalid response from server (expected token to be string)');
		}
		const valid = data.valid;
		if (!valid) {
			remove_login_token();
			throw new Error('Invalid token');
		}
	}

	set_login_token(token);
	const response: unknown = await (await fetch('/api/get_own_user_data')).json();
	if (!response) {
		throw new Error('Invalid response from server (expected truthy object)');
	}
	if (hasProperty(response, 'error')) {
		if (typeof response.error !== 'string') {
			throw new Error('Invalid response from server (expected error to be string)');
		}
		throw new Error(response.error);
	}
	if (!hasProperty(response, 'user_data')) {
		throw new Error('Invalid response from server (expected user_data attribute)');
	}
	const new_user_data = response.user_data;
	if (!is_user_data(new_user_data)) {
		throw new Error('Invalid response from server (expected user data)');
	}
	user_datas_store.set(new_user_data);
	current_auth_state.set(new_user_data.role);
}
