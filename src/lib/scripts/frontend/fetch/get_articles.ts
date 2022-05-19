import {
	type filter_type,
	type article_preview,
	is_article_preview_data
} from '$lib/scripts/universal/datatypes';
import type { JSONValue } from '@sveltejs/kit/types/private';
import { hasProperty } from 'functional-utilities';
import { get } from 'svelte/store';
import { articles_cache_store } from '../data/articles';
import { image_cache_store } from '../data/image';

export async function get_articles(
	start: number,
	end: number,
	filter: filter_type
): Promise<article_preview[]> {
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

	const body: JSONValue = await response.json();

	if (hasProperty(body, 'error')) {
		if (typeof body.error !== 'string') {
			throw new Error('Invalid error message');
		}
		throw new Error(body.error);
	}

	if (!hasProperty(body, 'articles')) {
		throw new Error('Missing Articles');
	}

	if (!Array.isArray(body.articles)) {
		throw new Error('Items is not an array');
	}

	if (!body.articles.every(is_article_preview_data)) {
		throw new Error('Items is not an array of simple item data types');
	}

	const articles_data = body.articles;
	const articles: article_preview[] = articles_data.map((article) => ({
		id: article.id,
		title: article.title,
		createdAt: article.createdAt,
		image_link_id: article.image_link.id
	}));

	const article_cache = get(articles_cache_store);
	articles.forEach((article) => {
		article_cache[article.id] = article;
	});
	articles_cache_store.set(article_cache);
	const image_cache = get(image_cache_store);
	articles_data.forEach((article_data) => {
		image_cache[article_data.image_link.id] = article_data.image_link.image_url;
	});
	image_cache_store.set(image_cache);

	return articles;
}
