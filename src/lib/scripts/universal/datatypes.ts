import { hasProperty } from 'functional-utilities';
import { idify } from './idify';

export interface category_data_type {
	name: string;
	id: string;
	description: string;
	text: string;
	subcategories: subcategory_data_type[];
}

export interface subcategory_data_type {
	name: string;
	id: string;
	text: string;
	description: string;
}

export function is_subcategory_data_type(data: unknown): data is subcategory_data_type {
	return (
		typeof data === 'object' &&
		hasProperty(data, 'name') &&
		hasProperty(data, 'id') &&
		hasProperty(data, 'description') &&
		hasProperty(data, 'text') &&
		typeof data.name === 'string' &&
		typeof data.id === 'string' &&
		typeof data.description === 'string' &&
		typeof data.text === 'string' &&
		data.name === idify(data.text)
	);
}

export function is_category_data_type(data: unknown): data is category_data_type {
	return (
		typeof data === 'object' &&
		hasProperty(data, 'name') &&
		hasProperty(data, 'id') &&
		hasProperty(data, 'description') &&
		hasProperty(data, 'subcategories') &&
		hasProperty(data, 'text') &&
		typeof data.name === 'string' &&
		typeof data.id === 'string' &&
		typeof data.description === 'string' &&
		typeof data.text === 'string' &&
		data.subcategories instanceof Array &&
		data.name === idify(data.text) &&
		data.subcategories.every(is_subcategory_data_type)
	);
}

export interface user_data_type {
	name: string;
	id: string;
	email: string;
	role: 'user' | 'admin' | 'root';
}

export function is_user_data(data: unknown): data is user_data_type {
	if (typeof data !== 'object') {
		return false;
	}
	if (!data) {
		return false;
	}
	if (!hasProperty(data, 'name') || typeof data.name !== 'string') {
		return false;
	}
	if (!hasProperty(data, 'id') || typeof data.id !== 'string') {
		return false;
	}
	if (!hasProperty(data, 'email') || typeof data.email !== 'string') {
		return false;
	}
	if (!hasProperty(data, 'role') || typeof data.role !== 'string') {
		return false;
	}
	if (!['user', 'admin', 'root'].includes(data.role)) {
		return false;
	}
	return true;
}

export interface simple_item_data_type {
	id: string;
	name: string;
	description: string;
	text: string;
	price: number;
	images: string[];
}

export function is_simple_item_data_type(data: unknown): data is simple_item_data_type {
	return (
		typeof data === 'object' &&
		hasProperty(data, 'id') &&
		hasProperty(data, 'name') &&
		hasProperty(data, 'description') &&
		hasProperty(data, 'text') &&
		hasProperty(data, 'price') &&
		hasProperty(data, 'images') &&
		typeof data.id === 'string' &&
		typeof data.name === 'string' &&
		typeof data.description === 'string' &&
		typeof data.text === 'string' &&
		typeof data.price === 'number' &&
		data.images instanceof Array &&
		data.images.every((v) => typeof v === 'string')
	);
}

export interface detailed_item_data_type extends simple_item_data_type {
	quantity: number;
}

export function is_detailed_item_data_type(data: unknown): data is detailed_item_data_type {
	return (
		is_simple_item_data_type(data) &&
		hasProperty(data, 'quantity') &&
		typeof data.quantity === 'number'
	);
}

export interface category_filter_type {
	category_id?: string;
	subcategory_id?: string;
}

export function is_category_filter(data: unknown): data is category_filter_type {
	if (typeof data !== 'object') {
		return false;
	}
	if (!data) {
		return false;
	}
	if (hasProperty(data, 'category') && typeof data.category !== 'string') {
		return false;
	}
	if (hasProperty(data, 'subcategory') && typeof data.subcategory !== 'string') {
		return false;
	}
	return true;
}

export interface filter_type extends category_filter_type {
	search?: string;
}

export function is_filter(data: unknown): data is filter_type {
	if (!is_category_filter(data)) {
		return false;
	}
	if (hasProperty(data, 'search') && typeof data.search !== 'string') {
		return false;
	}
	return true;
}
