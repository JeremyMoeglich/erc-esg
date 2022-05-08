import type { JSONValue } from '@sveltejs/kit/types/private';
import { hasProperty } from 'functional-utilities';
import { token_login } from './token_login';

export async function register(
	name: string,
	email: string,
	password: string
): Promise<Error | undefined> {
	const response: JSONValue = await (
		await fetch('/auth/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, email, password })
		})
	).json();
	if (!(response && typeof response === 'object')) {
		throw new Error('Invalid response from server (expected object)');
	}
	if (hasProperty(response, 'error')) {
		if (typeof response.error !== 'string') {
			throw new Error('Invalid response from server (expected error to be string)');
		}
		return new Error(response.error);
	}
	if (!hasProperty(response, 'token')) {
		throw new Error('Invalid response from server (expected token)');
	}
	if (typeof response.token !== 'string') {
		throw new Error('Invalid response from server (expected token to be string)');
	}
	const token = response.token;
	await token_login(token, false);
	return undefined;
}
