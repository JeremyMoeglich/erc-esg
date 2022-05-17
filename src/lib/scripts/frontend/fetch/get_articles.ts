import {
	is_article_preview,
	type filter_type,
	type article_preview
} from '$lib/scripts/universal/datatypes';
import type { JSONValue } from '@sveltejs/kit/types/private';
import { hasProperty } from 'functional-utilities';
import { get } from 'svelte/store';
import { articles_cache_store } from '../data/articles';

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

	if (!body.articles.every(is_article_preview)) {
		throw new Error('Items is not an array of simple item data types');
	}

	const cache = get(articles_cache_store);
	body.articles.forEach((article) => {
		cache[article.id] = article;
	});

	return body.articles;
}
