// import { z } from 'zod';

// const toBase64 = (file: File) =>
// 	new Promise<string | ArrayBuffer | null>((resolve, reject) => {
// 		const reader = new FileReader();
// 		reader.readAsDataURL(file);
// 		reader.onload = () => resolve(reader.result);
// 		reader.onerror = (error) => reject(error);
// 	});

// export async function upload_image(
// 	id: string,
// 	file: File,
// 	show_in_gallery: boolean
// ): Promise<string | Error> {
// 	console.log('upload_image', id, file);
// 	if (!file.type.startsWith('image/')) {
// 		return Promise.reject(new Error('Invalid file type'));
// 	}
// 	const response = await fetch(`/api/upload_image`, {
// 		method: 'POST',
// 		body: JSON.stringify({
// 			image: await toBase64(file),
// 			show_in_gallery,
// 			id
// 		}),
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	});

// 	const { image_url } = z
// 		.object({
// 			image_url: z.string()
// 		})
// 		.parse(await response.json());

// 	//const new_url = url.replace('ik.imagekit.io', 'img.moeglich.dev');
// 	//return new_url;
// 	return image_url;
// }

import { IMAGEKIT_PUBLIC_ENDPOINT, IMAGEKIT_PUBLIC_KEY } from '$lib/scripts/universal/consts';
import ImageKit from 'imagekit-javascript';
import type NodeImagekit from 'imagekit';
import { jfetch, jpost } from '$lib/scripts/universal/jfetch';

const imagekit = new ImageKit({
	urlEndpoint: IMAGEKIT_PUBLIC_ENDPOINT,
	publicKey: IMAGEKIT_PUBLIC_KEY
});

export async function upload_image(id: string, image: File, show_in_gallery: boolean) {
	const authenticationParameters = await jfetch<
		ReturnType<NodeImagekit['getAuthenticationParameters']>
	>('/api/imagekit_signature');

	if (authenticationParameters instanceof Error) {
		return authenticationParameters;
	}

	const url = await imagekit
		.upload({
			file: image,
			fileName: id,
			...authenticationParameters
		})
		.then((resp) => resp.url)
		.catch((error) => {
			return Error(`Failed to upload image: ${error}`);
		});

	if (url instanceof Error) {
		return url;
	}

	const resp = await jpost('/api/register_image', {
		id,
		url,
		show_in_gallery
	});

	if (resp instanceof Error) {
		return resp;
	} else {
		return url;
	}
}
