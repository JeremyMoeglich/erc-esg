import { current_auth_state } from './auth_state';
import { get_login_token, remove_login_token, set_login_token } from './login_token';
import { user_datas_store } from '../data/user_data';
import { z } from 'zod';
import { user_data_schema } from '$lib/scripts/universal/datatypes';

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

		const { valid } = z
			.object({
				valid: z.boolean()
			})
			.parse(await result.json());

		if (!valid) {
			remove_login_token();
			throw new Error('Invalid token');
		}
	}

	set_login_token(token);
	const response = await (await fetch('/api/get_own_user_data')).json();

	const { user_data } = z
		.object({
			user_data: user_data_schema
		})
		.parse(response);

	user_datas_store.set(user_data);
	current_auth_state.set(user_data.role);
}
