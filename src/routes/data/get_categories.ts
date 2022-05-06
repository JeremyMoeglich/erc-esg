import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ clientAddress }) => {
	return {
		body: {
			categories: ['Not implemented']
		},
		status: 501
	};
};
