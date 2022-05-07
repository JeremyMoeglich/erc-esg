import { writable, type Writable } from 'svelte/store';

export type auth_state = 'none' | 'normal' | 'admin' | 'root';

export const current_auth_state: Writable<auth_state> = writable('none');
export const in_auth_action: Writable<boolean> = writable(false);
