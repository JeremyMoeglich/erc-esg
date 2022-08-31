import { token_login } from './token_login';
import { z } from 'zod';

export async function login(email: string, password: string): Promise<Error | undefined> {
	const { token } = z
		.object({
			token: z.string()
		})
		.parse(
			await (
				await fetch('/auth/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email,
						password
					})
				})
			).json()
		);
	await token_login(token, false);
	return undefined;
}
