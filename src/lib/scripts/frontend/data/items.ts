import type {
	detailed_item_data_type,
	simple_item_data_type
} from '$lib/scripts/universal/datatypes';
import { writable, type Writable } from 'svelte/store';

export const items_cache_store: Writable<
	Record<string, detailed_item_data_type | simple_item_data_type>
> = writable({});
