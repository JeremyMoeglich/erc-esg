import type { JSONValue } from '@sveltejs/kit/types/private';
import { hasProperty } from 'functional-utilities';
import { get } from 'svelte/store';
import { image_cache_store } from '../data/image';

export async function get_image_url(name: string): Promise<string | Error> {
	let current_cache = get(image_cache_store);
	if (current_cache?.[name]) {
		return current_cache[name];
	}
	const url = `/api/images/${name}.json`;
	console.debug(`Fetching image url for ${url}`);
	const response = await fetch(url);
	const body: JSONValue = await response.json();
	if (hasProperty(body, 'error')) {
		if (typeof body.error !== 'string') {
			return new Error('Invalid error message');
		}
		return new Error(body.error);
	}
	if (!hasProperty(body, 'url')) {
		return new Error('Invalid response');
	}
	if (typeof body.url !== 'string') {
		return new Error('Invalid url');
	}
	current_cache = get(image_cache_store);
	image_cache_store.set({
		...current_cache,
		[name]: body.url
	});
	return body.url;
}
