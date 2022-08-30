import { z } from 'zod';

export type ZodObjectAny = z.ZodObject<any>; // eslint-disable-line @typescript-eslint/no-explicit-any

export function parse_to_date<S extends ZodObjectAny, K extends string>(
	obj: unknown,
	schema: S,
	keys: K[]
): z.infer<S> {
	const raw_data = keys
		.reduce((acc, key) => {
			acc.extend({ [key]: z.string() });
			return acc;
		}, schema)
		.parse(obj);
	return schema.parse(
		Object.assign(
			{},
			raw_data,
			keys.reduce((acc, key) => {
				acc[key] = new Date(raw_data[key]);
				return acc;
			}, {} as Record<K, Date>)
		)
	);
}
