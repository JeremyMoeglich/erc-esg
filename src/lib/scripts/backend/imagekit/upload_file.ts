import type { UploadResponse } from 'imagekit/dist/libs/interfaces';
import { imagekit_backend } from './imagekit';

export async function upload_image(name: string, image_data_url: string): Promise<UploadResponse> {
	const response = await imagekit_backend.upload({
		file: image_data_url,
		fileName: name
	});
	if (response.fileType !== 'image') {
		imagekit_backend.deleteFile(response.fileId);
	}
	return response;
}
