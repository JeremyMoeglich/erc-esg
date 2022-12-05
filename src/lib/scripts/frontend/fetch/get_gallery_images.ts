import { z } from 'zod';

export async function get_gallery_images(): Promise<string[]> {
	const response: Response = await fetch('/api/gallery_images.json');

	const { images } = z
		.object({
			images: z.array(z.string())
		})
		.parse(await response.json());

	return images;
}
