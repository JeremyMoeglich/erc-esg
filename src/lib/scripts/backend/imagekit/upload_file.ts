import type { UploadResponse } from 'imagekit/dist/libs/interfaces';
import { prisma_client } from '../prisma_client';
import { imagekit_backend } from './imagekit';

export async function upload_image(id: string, image: string): Promise<UploadResponse> {
	const response = await imagekit_backend.upload({
		file: image,
		fileName: id
	});
	if (response.fileType !== 'image') {
		imagekit_backend.deleteFile(response.fileId);
	}

	return response;
}
