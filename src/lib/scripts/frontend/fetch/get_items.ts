import {
	is_simple_item_data_type,
	type filter,
	type simple_item_data_type
} from '$lib/scripts/universal/datatypes';
import type { JSONValue } from '@sveltejs/kit/types/private';
import { hasProperty } from 'functional-utilities';
import { get } from 'svelte/store';
import { items_cache_store } from '../data/items';

export async function get_items(
	start: number,
	end: number,
	filter: filter
): Promise<simple_item_data_type[]> {
	const response = await fetch('/api/items', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			start,
			end,
			filter
		})
	}).catch((v) => v);

	const body: JSONValue = await response.json();

	if (hasProperty(body, 'error')) {
		if (typeof body.error !== 'string') {
			throw new Error('Invalid error message');
		}
		throw new Error(body.error);
	}

	if (!hasProperty(body, 'items')) {
		throw new Error('Missing items');
	}

	if (!Array.isArray(body.items)) {
		throw new Error('Items is not an array');
	}

	if (!body.items.every(is_simple_item_data_type)) {
		throw new Error('Items is not an array of simple item data types');
	}

	const cache = get(items_cache_store);
	body.items.forEach((item) => {
		cache[item.name] = item;
	});

	return body.items;
}
