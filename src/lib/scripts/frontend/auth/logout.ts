import { current_auth_state } from './auth_state';
import { get_login_token, remove_login_token } from './login_token';

export async function logout() {
	current_auth_state.set('none');
	const token = get_login_token();
	if (!token) {
		return;
	}
	await fetch('/auth/delete_token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ token })
	});
	remove_login_token();
}
