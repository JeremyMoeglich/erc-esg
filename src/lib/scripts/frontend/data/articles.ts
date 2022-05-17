import type { article, article_preview } from '$lib/scripts/universal/datatypes';
import { writable, type Writable } from 'svelte/store';

export const articles_cache_store: Writable<Record<string, article | article_preview>> = writable(
	{}
);
