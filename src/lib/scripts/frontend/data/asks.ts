import { get, writable, type Writable } from "svelte/store";


export interface Question<Resp extends string> {
    title: string,
    answers: Resp[],
    callback: (resp: Resp) => void;
}

export const asks_store: Writable<Question<string>[]> = writable([])

export async function ask<Resp extends string>(title: string, answers: Resp[]): Promise<Resp> {
    const promise = new Promise<Resp>((resolve, reject) => {
        const current_asks_store = get(asks_store);
        current_asks_store.push({
            title,
            answers,
            callback: resolve
        })
    })
}