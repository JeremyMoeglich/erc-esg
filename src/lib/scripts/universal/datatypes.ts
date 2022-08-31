import type { Role, User } from '@prisma/client';
import { z } from 'zod';

export const ROLES = ['user', 'admin', 'root'] as const;

export const role_schema = z.union([z.literal('user'), z.literal('admin'), z.literal('root')]);

export type safe_user_data_type<R extends Role = Role> = Omit<User, 'password_hash' | 'role'> & {
	role: R;
};

export const user_data_schema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	password_hash: z.string(),
	role: role_schema,
	tag: z.string()
});

export const safe_user_data_schema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	tag: z.string(),
	role: role_schema
});

export const article_preview_schema = z.object({
	id: z.string(),
	title: z.string(),
	createdAt: z.string(),
	image_link_id: z.string()
});

export type article_preview_type = z.infer<typeof article_preview_schema>;

export const imageLink_schema = z.object({
	id: z.string(),
	image_url: z.string()
});

export const article_preview_data_schema = z.object({
	id: z.string(),
	title: z.string(),
	createdAt: z.string(),
	image_link: imageLink_schema
});

export type article_preview_data_type = z.infer<typeof article_preview_data_schema>;

export const article_schema = article_preview_schema.extend({
	content: z.string()
});

export type article_type = z.infer<typeof article_schema>;

export const article_data_schema = article_preview_data_schema.extend({
	content: z.string()
});

export type article_data = z.infer<typeof article_data_schema>;

export const filter_schema = z
	.object({
		search: z.string()
	})
	.partial();

export type filter_type = z.infer<typeof filter_schema>;

export const contact_form_schema = z.object({
	id: z.string().optional(),
	name: z.string(),
	email: z.string(),
	phone: z.string().optional(),
	message: z.string()
});

export type contact_form_type = z.infer<typeof contact_form_schema>;
