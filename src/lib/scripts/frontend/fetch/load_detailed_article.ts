import {
	article_schema,
	article_data_schema,
	type article_type
} from '$lib/scripts/universal/datatypes';
import { get } from 'svelte/store';
import { z } from 'zod';
import { articles_cache_store } from '../data/articles';
import { image_cache_store } from '../data/image';

export async function load_article(id: string): Promise<article_type | undefined> {
	let cache = get(articles_cache_store);
	if (id in cache) {
		const cached_item = article_schema.safeParse(cache[id]);
		if (cached_item.success) {
			return cached_item.data;
		}
	}
	const response = await fetch('/api/get_article', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			id
		})
	});

	if (!response.ok) {
		return undefined;
	}

	const { item } = z
		.object({
			item: article_data_schema
		})
		.parse(await response.json());

	const article: article_type = {
		...item,
		image_link_id: item.image_link.id
	};

	cache = get(articles_cache_store);

	cache[id] = article;
	articles_cache_store.set(cache);

	const image_cache = get(image_cache_store);
	image_cache[item.image_link.id] = item.image_link.image_url;
	image_cache_store.set(image_cache);

	return article;
}
