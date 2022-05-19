import { is_article, type article } from '$lib/scripts/universal/datatypes';
import { hasProperty } from 'functional-utilities';
import { get } from 'svelte/store';
import type { JsonValue } from 'type-fest';
import { articles_cache_store } from '../data/articles';

export async function load_article(id: string): Promise<article | undefined> {
	let cache = get(articles_cache_store);
	if (hasProperty(cache, id)) {
		const cached_item = cache[id];
		if (is_article(cached_item)) {
			return cached_item;
		}
	}
	const response: Response | undefined = await fetch('/api/get_article', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			id
		})
	});
	
	if (!response) {
		return undefined;
	}

	const body: JsonValue = await response.json();

	if (hasProperty(body, 'error')) {
		if (typeof body.error !== 'string') {
			throw new Error('Invalid error message');
		}
		if (response.status === 404) {
			return undefined;
		}
		throw new Error(body.error);
	}
	if (!hasProperty(body, 'item')) {
		throw new Error('Missing item, without error');
	}
	if (!is_article(body.item)) {
		throw new Error('Invalid item');
	}

	cache = get(articles_cache_store);
	cache[id] = body.item;
	articles_cache_store.set(cache);
	return body.item;
}
