import { validate_get_admin_body } from '$lib/scripts/backend/endpoint_utils';
import { prisma_client } from '$lib/scripts/backend/db/prisma_client';
import { json } from '@sveltejs/kit';
import type { JsonObject } from 'type-fest';
import { z } from 'zod';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    const { id, name, images } = await validate_get_admin_body(
        request,
        z.object({
            id: z.string(),
            name: z.string(),
            images: z.array(z.string())
        })
    );

    await prisma_client.galeryCategory.upsert({
        where: {
            id
        },
        create: {
            id,
            name,
            images
        },
        update: {
            name,
            images
        }
    });

    return json({} as JsonObject);
};
