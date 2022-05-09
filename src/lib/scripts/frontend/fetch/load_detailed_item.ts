import {
	is_detailed_item_data_type,
	type detailed_item_data_type
} from '$lib/scripts/universal/datatypes';
import { hasProperty } from 'functional-utilities';
import { get } from 'svelte/store';
import type { JsonValue } from 'type-fest';
import { items_cache_store } from '../data/items';

export async function load_item(name: string): Promise<detailed_item_data_type | undefined> {
	let cache = get(items_cache_store);
	if (hasProperty(cache, name)) {
		const cached_item = cache[name];
		if (is_detailed_item_data_type(cached_item)) {
			return cached_item;
		}
	}
	const response: Response = await fetch('/api/get_item', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name
		})
	}).catch((v) => v);

	if (response.status === 404) {
		return undefined;
	}

	const body: JsonValue = await response.json();

	if (hasProperty(body, 'error')) {
		if (typeof body.error !== 'string') {
			throw new Error('Invalid error message');
		}
		throw new Error(body.error);
	}
	if (!hasProperty(body, 'item')) {
		throw new Error('Missing item, without error');
	}
	if (!is_detailed_item_data_type(body.item)) {
		throw new Error('Invalid item');
	}

	cache = get(items_cache_store);
	cache[name] = body.item;
	items_cache_store.set(cache);
}
