import { z } from 'zod';

const toBase64 = (file: File) =>
	new Promise<string | ArrayBuffer | null>((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

export async function upload_image(id: string, file: File, show_in_gallery: boolean): Promise<string | Error> {
	console.log('upload_image', id, file);
	if (!file.type.startsWith('image/')) {
		return Promise.reject(new Error('Invalid file type'));
	}
	const response = await fetch(`/api/upload_image`, {
		method: 'POST',
		body: JSON.stringify({
			image: await toBase64(file),
			show_in_gallery,
			id
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const { image_url } = z
		.object({
			image_url: z.string()
		})
		.parse(await response.json());

	//const new_url = url.replace('ik.imagekit.io', 'img.moeglich.dev');
	//return new_url;
	return image_url;
}
