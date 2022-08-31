import type { article_type } from '$lib/scripts/universal/datatypes';
import { get } from 'svelte/store';
import { update_index } from '../data/local_changes';

export async function update_article(article: article_type) {
	const response: Response = await fetch('/api/update_article', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			article
		})
	});

	if (response.status !== 200) {
		throw new Error(await response.text());
	}

	update_index.set(get(update_index) + 1);
}
