import {
	type filter_type,
	type article_preview_type,
	article_preview_data_schema
} from '$lib/scripts/universal/datatypes';
import { get } from 'svelte/store';
import { z } from 'zod';
import { articles_cache_store } from '../data/articles';
import { image_cache_store } from '../data/image';

export async function get_articles(
	start: number,
	end: number,
	filter: filter_type
): Promise<article_preview_type[]> {
	const response: Response = await fetch('/api/get_articles', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			start,
			end,
			filter
		})
	});

	const { articles } = z
		.object({
			articles: z.array(article_preview_data_schema)
		})
		.parse(await response.json());

	const article_previews: article_preview_type[] = articles.map((article) => ({
		id: article.id,
		title: article.title,
		createdAt: article.createdAt,
		image_link_id: article.image_link.id
	}));

	const article_cache = get(articles_cache_store);
	article_previews.forEach((article) => {
		article_cache[article.id] = article;
	});
	articles_cache_store.set(article_cache);
	const image_cache = get(image_cache_store);
	articles.forEach((article_data) => {
		image_cache[article_data.image_link.id] = article_data.image_link.image_url;
	});
	image_cache_store.set(image_cache);

	return article_previews;
}
