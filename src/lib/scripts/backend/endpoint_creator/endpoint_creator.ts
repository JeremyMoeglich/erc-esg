import type { User } from '@prisma/client';
import { typed_entries, typed_from_entries } from 'functional-utilities';
import type { JsonValue } from 'type-fest';
import type { RequestHandler } from '@sveltejs/kit';
import { get_request_body, validate_get_admin_body } from '../endpoint_utils';

interface Endpoint_Options<
	ReturnType extends JsonValue & { error?: string } = { error?: string },
	Params extends Record<string, string> = Record<string, never>,
	BodyType extends JsonValue = Record<string, never>
> {
	access: 'all' | 'admin';
	success: (params: { body: BodyType; user: User }) => Promise<ReturnType>;
	validator: (body: JsonValue) => Promise<boolean> | boolean;
}

export function make_endpoint<
	GetReturn extends JsonValue & { error?: string } = Record<string, never>
>(operations: {
	get: Endpoint_Options<GetReturn>;
	post: Endpoint_Options;
	put: Endpoint_Options;
	delete: Endpoint_Options;
	patch: Endpoint_Options;
}): Record<'get' | 'post' | 'put' | 'delete' | 'patch', RequestHandler<Params, ReturnType>> {
	
	return typed_entries(operations).map(([method, { access, success, validator }]) => {
		async function body_handler<BodyType extends JsonValue, RequestType>(
			body: BodyType | Error,
			request: RequestType
		) {
			if (body instanceof Error) {
				return {
					status: 401,
					body: {
						error: body.message
					}
				};
			}
			if (!body || !validator(body)) {
				return {
					status: 400,
					body: {
						error: 'Field datatypes invalid'
					}
				};
			}
			await success({ body, user: request.user });
		}

		return typed_from_entries([
			method,
			method === 'get'
				? async ({ request }) => {
						const body =
							access === 'admin'
								? await validate_get_admin_body(request, [])
								: await get_request_body(request, []);

						return await body_handler(body, request);
				  }
				: async ({ request }) => {
						const body =
							access === 'admin'
								? await validate_get_admin_body(request, [])
								: await get_request_body(request, []);

						return await body_handler(body, request);
				  }
		]);
	});
}
