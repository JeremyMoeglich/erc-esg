import { writable, type Writable } from 'svelte/store';

export const delay: Writable<number> = writable(0);
export const in_delay: Writable<{ delay: number; duration: number }> = writable({
	delay: 0,
	duration: 500
});
export const out_delay: Writable<{ delay: number; duration: number }> = writable({
	delay: 0,
	duration: 500
});

delay.subscribe((value) => {
	in_delay.set({ delay: value, duration: 500 - value });
	out_delay.set({ delay: 0, duration: 500 - value });
});
