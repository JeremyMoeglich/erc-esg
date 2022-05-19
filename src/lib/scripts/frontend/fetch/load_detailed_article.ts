import { is_article, is_article_data, type article } from '$lib/scripts/universal/datatypes';
import { hasProperty } from 'functional-utilities';
import { get } from 'svelte/store';
import type { JsonValue } from 'type-fest';
import { articles_cache_store } from '../data/articles';
import { image_cache_store } from '../data/image';

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

	console.log(body);

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
	if (!is_article_data(body.item)) {
		throw new Error('Invalid item');
	}

	const article: article = {
		id: body.item.id,
		title: body.item.title,
		createdAt: body.item.createdAt,
		image_link_id: body.item.image_link.id,
		content: body.item.content
	};

	cache = get(articles_cache_store);

	cache[id] = article;
	articles_cache_store.set(cache);

	const image_cache = get(image_cache_store);
	image_cache[body.item.image_link.id] = body.item.image_link.image_url;
	image_cache_store.set(image_cache);

	return article;
}
