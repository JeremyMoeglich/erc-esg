import type { JsonValue } from 'type-fest';
import type { RequestHandler } from '@sveltejs/kit';
import { get_auth_user_data, get_body } from '../endpoint_utils';
import type { user_data_type } from '$lib/scripts/universal/datatypes';

type access_type = 'all' | 'admin' | 'user';
type operations = 'get' | 'post' | 'put' | 'delete' | 'patch';

type PickByValue<T, V> = Pick<T, { [K in keyof T]: T[K] extends V ? K : never }[keyof T]>;
type Entries<T> = {
	[K in keyof T]: [keyof PickByValue<T, T[K]>, T[K]];
}[keyof T][];

interface Endpoint_Options<
	A extends access_type,
	operation extends operations,
	ReturnBodyType extends JsonValue & { error?: string } = { error?: string },
	BodyType extends Readonly<JsonValue> = Record<string, never>,
	Params extends Readonly<JsonValue> = Record<string, never>
> {
	access: A;
	success: (
		passed: (A extends 'admin' | 'user' ? { user: user_data_type } : Record<string, never>) &
			(operation extends 'get' ? Record<string, never> : { body: BodyType }) & { params: Params }
	) => Promise<{ body: ReturnBodyType; status: number }>;
	validator: operation extends 'get' ? undefined : (body: Readonly<JsonValue>) => body is BodyType;
}

export function make_endpoint<
	GetA extends access_type,
	PostA extends access_type,
	PutA extends access_type,
	DeleteA extends access_type,
	PatchA extends access_type,
	Params extends Record<string, string> = Record<string, never>,
	GetReturn extends JsonValue & { error?: string } = { error?: string }
>(operations: {
	get: Endpoint_Options<GetA, 'get', GetReturn>;
	post: Endpoint_Options<PostA, 'post'>;
	put: Endpoint_Options<PutA, 'put'>;
	delete: Endpoint_Options<DeleteA, 'delete'>;
	patch: Endpoint_Options<PatchA, 'patch'>;
}) {
	const funcs = (Object.entries(operations) as Entries<typeof operations>).map(
		([method, { access, success, validator }]) => {
			async function handler<BodyType extends JsonValue>(
				body: typeof method extends 'get' ? undefined : BodyType | Error,
				request: Request,
				params: Params
			) {
				if (body !== undefined) {
					if (body instanceof Error) {
						return {
							status: 401,
							body: {
								error: body.message
							}
						};
					}
				}
				if (validator === undefined) {
					throw new Error('validator is not defined, this is not intended');
				}
				if (!body || !validator(body)) {
					return {
						status: 400,
						body: {
							error: 'Field datatypes invalid'
						}
					};
				}
				const user = access === 'all' ? undefined : await get_auth_user_data(request);
				if (user instanceof Error) {
					return {
						status: 401,
						body: {
							error: user.message
						}
					};
				}
				return await success({ body, params, user } as any); // TODO: improve this
			}

			const func: [
				typeof method,
				typeof method extends 'get'
					? RequestHandler<Params, GetReturn>
					: RequestHandler<Params, { error?: string }>
			] = [
				method,
				method === 'get'
					? async ({ request, params }) => {
							return await handler(undefined as any, request, params); // TODO: improve this
					  }
					: async ({ request, params }) => {
							const body = await get_body(request);
							return await handler(body, request, params);
					  }
			];

			return func;
		}
	);
	return funcs;
}
