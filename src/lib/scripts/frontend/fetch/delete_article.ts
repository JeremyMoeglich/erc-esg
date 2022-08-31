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

	if (response.status !== 200) {
		throw new Error(`Error deleting article: ${response.status}`);
	}

	const article_cache = get(articles_cache_store);
	delete article_cache[id];
	articles_cache_store.set(article_cache);
}
