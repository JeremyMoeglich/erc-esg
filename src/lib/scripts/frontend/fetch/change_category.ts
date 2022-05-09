import type { category_data_type } from '$lib/scripts/universal/datatypes';
import { hasProperty } from 'functional-utilities';
import { get } from 'svelte/store';
import { category_datas_store } from '../data/category_data';
import { is_loading } from '../loading_store';

export async function change_category(name: string, new_data: category_data_type) {
	is_loading.set(true);
	try {
		const response = await await fetch('/api/change_category', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				new_data
			})
		}).catch((v) => v);

		const body = await response.json();
		if (typeof body === 'object' && hasProperty(body, 'error')) {
			throw new Error(body.error);
		}

		const current_categories = get(category_datas_store) ?? [];
		const index = current_categories.findIndex((v) => v.name === name);
		if (index !== -1) {
			current_categories[index] = new_data;
			category_datas_store.set(current_categories);
		} else {
			throw new Error('rename_category: category not found');
		}
	} finally {
		is_loading.set(false);
	}
}
