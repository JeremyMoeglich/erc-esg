export async function update_profile(name: string, email: string, password: string): Promise<void> {
	await fetch('/auth/update_profile', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name, email, password })
	});
}
