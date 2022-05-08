import type { category_data_type } from '$lib/scripts/universal/datatypes';
import { writable, type Writable } from 'svelte/store';

export const category_datas_store: Writable<undefined | category_data_type[]> = writable(undefined);
