import type { article_type, article_preview_type } from '$lib/scripts/universal/datatypes';
import { writable, type Writable } from 'svelte/store';

export const articles_cache_store: Writable<Record<string, article_type | article_preview_type>> =
	writable({});
