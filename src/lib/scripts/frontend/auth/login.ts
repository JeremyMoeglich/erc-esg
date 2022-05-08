import type { JSONValue } from '@sveltejs/kit/types/private';
import { hasProperty } from 'functional-utilities';
import { token_login } from './token_login';

export async function login(email: string, password: string): Promise<Error | undefined> {
	const result = await fetch('/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			identifier: email,
			password
		})
	});
	const data: JSONValue = await result.json();
	if (!(data && typeof data === 'object')) {
		throw new Error('Invalid response from server (expected object)');
	}
	if (hasProperty(data, 'error')) {
		if (typeof data.error !== 'string') {
			throw new Error('Invalid response from server (expected error to be string)');
		}
		return new Error(data.error);
	}
	if (!hasProperty(data, 'token')) {
		throw new Error('Invalid response from server (expected token)');
	}
	if (typeof data.token !== 'string') {
		throw new Error('Invalid response from server (expected token to be string)');
	}
	const token = data.token;
	await token_login(token, false);
	return undefined;
}
