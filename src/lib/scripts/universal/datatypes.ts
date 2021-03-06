import type { imageLink, Role, User } from '@prisma/client';
import { hasProperty } from 'functional-utilities';

export type user_data_type<R extends Role = Role> = Omit<User, 'password_hash' | 'role'> & {
	role: R;
};

export const ROLES = ['user', 'admin', 'root'] as const;

export function is_role(role: unknown): role is Role {
	return ROLES.includes(role as Role);
}

export function is_user_data(
	data: unknown,
	roles: readonly Role[] = ROLES
): data is user_data_type {
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
	if (!hasProperty(data, 'tag') || typeof data.tag !== 'string') {
		return false;
	}
	if (!roles.includes(data.role as Role)) {
		return false;
	}
	return true;
}

export function is_user_of_role<R extends Role>(
	user: unknown,
	roles: R[]
): user is user_data_type<R> {
	if (!is_user_data(user)) {
		return false;
	}
	return roles.includes(user.role as R);
}

export interface article_preview {
	id: string;
	title: string;
	createdAt: string;
	image_link_id: string;
}

export interface article_preview_data {
	id: string;
	title: string;
	createdAt: string;
	image_link: imageLink;
}

export function is_image_link(data: unknown): data is imageLink {
	if (
		hasProperty(data, 'id') &&
		typeof data.id === 'string' &&
		hasProperty(data, 'image_url') &&
		typeof data.image_url === 'string'
	) {
		return true;
	}
	return false;
}

export function is_article_preview_data(data: unknown): data is article_preview_data {
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

export function is_article_preview(data: unknown): data is article_preview {
	return (
		typeof data === 'object' &&
		hasProperty(data, 'id') &&
		hasProperty(data, 'title') &&
		hasProperty(data, 'createdAt') &&
		hasProperty(data, 'image_link_id') &&
		typeof data.id === 'string' &&
		typeof data.title === 'string' &&
		typeof data.createdAt === 'string' &&
		typeof data.image_link_id === 'string'
	);
}

export interface article extends article_preview {
	content: string;
}

export interface article_data extends article_preview_data {
	content: string;
}

export function is_article(data: unknown): data is article {
	return (
		is_article_preview(data) && hasProperty(data, 'content') && typeof data.content === 'string'
	);
}

export function is_article_data(data: unknown): data is article_data {
	return (
		is_article_preview_data(data) &&
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

export interface contact_form_type {
	id?: string;
	name: string;
	email: string;
	phone?: string;
	message: string;
}

export function is_contact_form(data: unknown): data is contact_form_type {
	if (hasProperty(data, 'id') && typeof data.id !== 'string') {
		return false;
	}
	if (hasProperty(data, 'phone') && typeof data.phone !== 'string') {
		return false;
	}
	if (
		!hasProperty(data, 'name') ||
		typeof data.name !== 'string' ||
		!hasProperty(data, 'email') ||
		typeof data.email !== 'string' ||
		!hasProperty(data, 'message') ||
		typeof data.message !== 'string'
	) {
		return false;
	}
	return true;
}
