import { idify } from '$lib/scripts/universal/idify';
import { hasProperty } from 'functional-utilities';
import { get } from 'svelte/store';
import { category_datas_store } from '../data/category_data';
import { is_loading } from '../loading_store';

export async function create_category(text: string) {
	is_loading.set(true);
	try {
		const response: unknown = await (
			await fetch('/api/create_category', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					text,
					page_variant: 'main'
				})
			}).catch((v) => v)
		).json();

		if (
			response &&
			typeof response === 'object' &&
			hasProperty(response, 'id') &&
			typeof response.id === 'string'
		) {
			category_datas_store.set(
				(get(category_datas_store) ?? []).concat([
					{
						description: 'leere Beschreibung',
						id: response.id,
						name: idify(text),
						text,
						subcategories: []
					}
				])
			);
		} else {
			if (hasProperty(response, 'error')) {
				if (typeof response.error === 'string') {
					throw new Error(response.error);
				} else {
					throw new Error('Unknown error');
				}
			} else {
				throw new Error('create_category: response is not valid');
			}
		}
	} finally {
		is_loading.set(false);
	}
}
