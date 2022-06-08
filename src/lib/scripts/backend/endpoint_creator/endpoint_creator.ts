import type { User } from '@prisma/client';
import { typed_entries } from 'functional-utilities';
import type { JsonValue } from 'type-fest';
import type { RequestHandler } from '@sveltejs/kit';
import { get_request_body, validate_get_admin_body } from '../endpoint_utils';

interface Endpoint_Options<
	ReturnType extends JsonValue = { error?: string },
	BodyType extends JsonValue = {}
> {
	access: 'all' | 'admin';
	success: (params: { body: BodyType; user: User }) => Promise<ReturnType>;
	validator: (body: JsonValue) => Promise<boolean> | boolean;
}

function make_endpoint<
	GetReturn extends JsonValue & { error?: string } = Record<string, never>
>(operations: {
	get: Endpoint_Options<GetReturn>;
	post: Endpoint_Options;
	put: Endpoint_Options;
	delete: Endpoint_Options;
	patch: Endpoint_Options;
}) {
	return typed_entries(operations).map(([method, { access, success, validator }]) => {
        async function body_handler<BodyType extends JsonValue, RequestType>(body: BodyType, request: RequestType) {
            
        }
		return [
			method,
			async ({ request }): RequestHandler => {
				const body =
					access === 'admin'
						? await validate_get_admin_body(request, [])
						: await get_request_body(request, []);
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
				return await success({ body, user: request.user });
			}
		];
	});
}
