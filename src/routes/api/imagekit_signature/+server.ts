import ImageKit from "imagekit";
import type { RequestHandler } from "./$types";
import { error, json } from "@sveltejs/kit";
import { IMAGEKIT_PUBLIC_ENDPOINT, IMAGEKIT_PUBLIC_KEY } from "$lib/scripts/universal/consts";
import { panic } from "functional-utilities";
import { has_admin_access } from "$lib/scripts/backend/endpoint_utils";

const imagekit = new ImageKit({
    publicKey: IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY ?? panic("IMAGEKIT_PRIVATE_KEY not set"),
    urlEndpoint: IMAGEKIT_PUBLIC_ENDPOINT
});

export const GET: RequestHandler = async ({ request }) => {
    if (!has_admin_access(request)) {
        throw error(403, 'Not authorized');
    }

    const authenticationParameters = imagekit.getAuthenticationParameters();
    return json(authenticationParameters);
}