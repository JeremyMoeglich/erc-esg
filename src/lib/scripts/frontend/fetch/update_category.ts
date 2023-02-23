export async function update_category(id: string, name: string, images: string[]) {
	const response: Response = await fetch('/api/update_category', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			id,
			name,
			images
		})
	});

	if (response.status !== 200) {
		throw new Error(await response.text());
	}
}
