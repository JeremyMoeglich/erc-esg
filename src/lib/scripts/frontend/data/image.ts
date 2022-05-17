import { writable, type Writable } from 'svelte/store';

export const image_cache_store: Writable<Record<string, string>> = writable({});
