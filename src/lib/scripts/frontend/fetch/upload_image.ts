import type { JSONValue } from '@sveltejs/kit/types/private';
import { hasProperty } from 'functional-utilities';

const toBase64 = (file: File) =>
	new Promise<string | ArrayBuffer | null>((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

export async function upload_image(id: string, file: File): Promise<string | Error> {
	console.log('upload_image', id, file);
	if (!file.type.startsWith('image/')) {
		return Promise.reject(new Error('Invalid file type'));
	}
	const response = await fetch(`/api/upload_image`, {
		method: 'POST',
		body: JSON.stringify({
			image: await toBase64(file),
			id
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const body: JSONValue = await response.json();

	if (hasProperty(body, 'error')) {
		if (typeof body.error !== 'string') {
			return new Error('Invalid error message');
		}
		return new Error(body.error);
	}
	if (!hasProperty(body, 'image_url')) {
		return new Error('Invalid response');
	}
	const url = body.image_url;
	if (typeof url !== 'string') {
		return new Error('Invalid url');
	}

	//const new_url = url.replace('ik.imagekit.io', 'img.moeglich.dev');
	//return new_url;
	return url;
}
