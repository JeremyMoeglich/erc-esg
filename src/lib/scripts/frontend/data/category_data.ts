import type { category_data_type } from '$lib/scripts/universal/datatypes';
import { index_by } from 'functional-utilities';
import { writable, type Writable } from 'svelte/store';

export const category_datas_store: Writable<undefined | category_data_type[]> = writable(undefined);
export const indexed_category_datas_store: Writable<
	undefined | Record<string, category_data_type>
> = writable(undefined);

category_datas_store.subscribe((category_datas) => {
	if (category_datas) {
		indexed_category_datas_store.set(index_by(category_datas, 'name'));
	}
});
