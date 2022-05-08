import { hasProperty } from 'functional-utilities';
import { get } from 'svelte/store';
import { category_datas_store } from '../data/category_data';
import { is_loading } from '../loading_store';

export async function delete_category(name: string) {
	is_loading.set(true);
	try {
		const response = await await fetch('/api/delete_category', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				page_variant: 'main'
			})
		}).catch((v) => v);

		const body = await response.json();
		if (typeof body === 'object' && hasProperty(body, 'error')) {
			throw new Error(body.error);
		}

		const current_categories = get(category_datas_store) ?? [];
		const index = current_categories.findIndex((v) => v.name === name);
		if (index !== -1) {
			current_categories.splice(index, 1);
			category_datas_store.set(current_categories);
		} else {
			throw new Error('delete_category: category not found');
		}
	} finally {
		is_loading.set(false);
	}
}
