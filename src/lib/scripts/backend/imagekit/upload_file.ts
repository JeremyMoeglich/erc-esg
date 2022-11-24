import { z } from 'zod';

const upload_response_schema = z.object({
	fileId: z.string(),
	fileType: z.string(),
	url: z.string()
});

export async function upload_image(
	id: string,
	image: string
): Promise<z.infer<typeof upload_response_schema>> {
	const url = 'https://upload.imagekit.io/api/v1/files/upload';

	const form_data = new FormData();
	form_data.append('file', image);
	form_data.append('fileName', id);

	const response: unknown = await fetch(url, {
		method: 'POST',
		headers: {
			Authorization: 'Basic ' + btoa(process.env.IMAGEKIT_PRIVATE_KEY + ':')
		},
		body: form_data
	}).then((response) => response.json());

	return upload_response_schema.parse(response);
}
