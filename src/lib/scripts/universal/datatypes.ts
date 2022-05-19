import type { imageLink, User } from '@prisma/client';
import { hasProperty } from 'functional-utilities';

export type user_data_type = Omit<User, 'password_hash'>;

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

export type article_preview = {
	id: string;
	title: string;
	createdAt: string;
	image_link: imageLink;
};

export function is_image_link(data: unknown): data is imageLink {
	if (
		hasProperty(data, 'id') &&
		typeof data.id === 'string' &&
		hasProperty(data, 'image_url') &&
		typeof data.image_url === 'string' &&
		hasProperty(data, 'name') &&
		typeof data.name === 'string'
	) {
		return true;
	}
	return false;
}

export function is_article_preview(data: unknown): data is article_preview {
	return (
		typeof data === 'object' &&
		hasProperty(data, 'id') &&
		hasProperty(data, 'title') &&
		hasProperty(data, 'createdAt') &&
		hasProperty(data, 'image_link') &&
		typeof data.id === 'string' &&
		typeof data.title === 'string' &&
		typeof data.createdAt === 'string' &&
		is_image_link(data.image_link)
	);
}

export interface article extends article_preview {
	content: string;
}

export function is_article(data: unknown): data is article {
	return (
		is_article_preview(data) &&
		hasProperty(data, 'content') &&
		typeof data.content === 'string'
	);
}

export interface filter_type {
	search?: string;
}

export function is_filter(data: unknown): data is filter_type {
	if (hasProperty(data, 'search') && typeof data.search !== 'string') {
		return false;
	}
	return true;
}
