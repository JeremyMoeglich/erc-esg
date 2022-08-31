import { user_data_schema } from '$lib/scripts/universal/datatypes';
import { z } from 'zod';

export async function get_admins() {
	const response = await fetch('/api/get_admins');
	const { admins } = z
		.object({
			admins: z.array(
				user_data_schema.extend({
					role: z.literal('admin')
				})
			)
		})
		.parse(await response.json());

	return admins;
}
