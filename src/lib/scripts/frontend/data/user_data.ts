import type { user_data_type } from '$lib/scripts/universal/datatypes';
import { writable, type Writable } from 'svelte/store';


export const user_datas_store: Writable<undefined | user_data_type> = writable(undefined);
