import type { article } from '$lib/scripts/universal/datatypes';
import { hasProperty } from 'functional-utilities';
import { get } from 'svelte/store';
import type { JsonValue } from 'type-fest';
import { update_index } from '../data/local_changes';

export async function update_article(article: article) {
	const response: Response = await fetch('/api/update_article', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			article
		})
	});

	const body: JsonValue = await response.json();

	if (hasProperty(body, 'error')) {
		if (typeof body.error !== 'string') {
			throw new Error('Invalid error message');
		}
		throw new Error(body.error);
	}

	update_index.set(get(update_index) + 1);
}
