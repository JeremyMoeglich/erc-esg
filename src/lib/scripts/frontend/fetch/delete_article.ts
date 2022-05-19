import type { JSONValue } from '@sveltejs/kit/types/private';
import { hasProperty } from 'functional-utilities';
import { get } from 'svelte/store';
import { articles_cache_store } from '../data/articles';

export async function delete_article(id: string): Promise<void> {
	const response: Response = await fetch('/api/delete_article', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			id
		})
	});

	const body: JSONValue = await response.json();

	if (hasProperty(body, 'error')) {
		if (typeof body.error !== 'string') {
			throw new Error('Invalid error message');
		}
		throw new Error(body.error);
	}

	const article_cache = get(articles_cache_store);
	delete article_cache[id];
	articles_cache_store.set(article_cache);
}
