import { get, writable, type Writable } from 'svelte/store';

export interface Question<Resp extends string> {
	title: string;
	answers: Resp[];
	callback: (resp: Resp) => void;
}

export const asks_store: Writable<Question<string>[]> = writable([]);

export async function ask<Resp extends string>(title: string, answers: Resp[]): Promise<Resp> {
	return new Promise<Resp>((resolve) => {
		const current_asks_store = get(asks_store);
		const question = {
			title,
			answers,
			callback: (resp: Resp) => {
				resolve(resp);
			}
		};
		current_asks_store.push(question as unknown as Question<string>);
		asks_store.set(current_asks_store);
	});
}
