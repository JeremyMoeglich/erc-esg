import ImageKit from 'imagekit';
import 'dotenv/config';

const url = 'https://ik.imagekit.io/p6h71lfbt/';

export const imagekit_backend = new ImageKit({
	publicKey: 'public_QAySkHyk+7gL+mj3VMmV4ZhqKd8=',
	privateKey:
		process.env?.IMAGEKIT_PRIVATE_KEY ??
		(() => {
			throw new Error('IMAGEKIT_PRIVATE_KEY is not set');
		})(),
	urlEndpoint: url
});
