import { hasProperty } from 'functional-utilities';

export interface category_data_type {
	name: string;
	id: number;
	description: string;
	text: string;
	subcategories: subcategory_data_type[];
}

export interface subcategory_data_type {
	name: string;
	id: number;
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
		typeof data.id === 'number' &&
		typeof data.description === 'string' &&
		typeof data.text === 'string'
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
		typeof data.id === 'number' &&
		typeof data.description === 'string' &&
		typeof data.text === 'string' &&
		data.subcategories instanceof Array &&
		data.subcategories.every(is_subcategory_data_type)
	);
}

export interface user_data_type {
	name: string;
	id: number;
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
	if (!hasProperty(data, 'id') || typeof data.id !== 'number') {
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
