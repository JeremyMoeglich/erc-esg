import { z } from 'zod';
import { token_login } from './token_login';

export async function register(
	name: string,
	email: string,
	password: string
): Promise<Error | undefined> {
	const { token } = z
		.object({
			token: z.string()
		})
		.parse(
			await (
				await fetch('/auth/create', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ name, email, password })
				})
			).json()
		);
	await token_login(token, false);
	return undefined;
}
