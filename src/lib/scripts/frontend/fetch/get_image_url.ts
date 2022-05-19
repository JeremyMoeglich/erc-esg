import type { JSONValue } from '@sveltejs/kit/types/private';
import { hasProperty } from 'functional-utilities';
import { get } from 'svelte/store';
import { image_cache_store } from '../data/image';

export async function get_image_url(id: string): Promise<string | Error> {
	let current_cache = get(image_cache_store);
	if (hasProperty(current_cache, id)) {
		return current_cache[id];
	}
	const url = `/api/images/${id}.json`;
	const response = await fetch(url);
	const body: JSONValue = await response.json();
	if (hasProperty(body, 'error')) {
		if (typeof body.error !== 'string') {
			return new Error('Invalid error message');
		}
		return new Error(body.error);
	}
	if (!hasProperty(body, 'image_url')) {
		return new Error('Invalid response');
	}
	if (typeof body.image_url !== 'string') {
		return new Error('Invalid url');
	}
	current_cache = get(image_cache_store);
	image_cache_store.set({
		...current_cache,
		[id]: body.image_url
	});
	return body.image_url;
}
