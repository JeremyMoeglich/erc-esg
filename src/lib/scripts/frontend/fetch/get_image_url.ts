import { get } from 'svelte/store';
import { z } from 'zod';
import { image_cache_store } from '../data/image';

export async function get_image_url(id: string): Promise<string | Error> {
	let current_cache = get(image_cache_store);
	if (id in current_cache) {
		return current_cache[id];
	}
	const url = `/api/images/${id}.json`;
	const response = await fetch(url);
	const { image_url } = z
		.object({
			image_url: z.string()
		})
		.parse(await response.json());

	current_cache = get(image_cache_store);
	image_cache_store.set({
		...current_cache,
		[id]: image_url
	});
	return image_url;
}
