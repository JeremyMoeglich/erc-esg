import { writable, type Writable } from 'svelte/store';

export const update_index: Writable<number> = writable(0);
