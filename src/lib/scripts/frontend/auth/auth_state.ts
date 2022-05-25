import { writable, type Writable } from 'svelte/store';

export type auth_state = 'none' | 'user' | 'admin' | 'root' | 'linus';

export const current_auth_state: Writable<auth_state> = writable('none');
export const admin_mode: Writable<boolean> = writable(false);
export const in_auth_action: Writable<boolean> = writable(false);

current_auth_state.subscribe((auth_state) => {
	if (auth_state === 'admin' || auth_state === 'root' || auth_state === 'linus') {
		admin_mode.set(true);
	} else {
		admin_mode.set(false);
	}
});
