import { z } from 'zod';

export async function get_gallery_images() {
	const response: Response = await fetch('/api/gallery_images.json');

	const { images } = z
		.object({
			images: z.array(z.object({
				id: z.string(),
				name: z.string(),
				images: z.array(z.string())
			}))
		})
		.parse(await response.json());

	return images;
}
