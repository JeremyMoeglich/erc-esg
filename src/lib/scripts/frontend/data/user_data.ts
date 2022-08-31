import type { safe_user_data_type } from '$lib/scripts/universal/datatypes';
import { writable, type Writable } from 'svelte/store';

export const user_datas_store: Writable<undefined | safe_user_data_type> = writable(undefined);
