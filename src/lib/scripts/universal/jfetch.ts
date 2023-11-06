export function jfetch<T>(url: string): Promise<T | Error> {
	return fetch(url)
		.then((response) => {
			if (!response.ok) {
				return Error(`Failed to fetch ${url}: ${response.statusText}`);
			}

			return response.json();
		})
		.catch((error) => {
			return Error(`Failed to fetch ${url}: ${error}`);
		});
}

export function jpost<T>(url: string, body: unknown): Promise<T | Error> {
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then((response) => {
			if (!response.ok) {
				return Error(`Failed to fetch ${url}: ${response.statusText}`);
			}

			return response.json();
		})
		.catch((error) => {
			return Error(`Failed to fetch ${url}: ${error}`);
		});
}
