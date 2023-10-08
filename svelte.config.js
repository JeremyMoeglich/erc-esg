import staticAdapter from '@sveltejs/adapter-static';
import nodeAdapter from '@sveltejs/adapter-node';
import vercelAdapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
import { optimizeImports } from 'carbon-preprocess-svelte';

//@ts-check

const hasAdapter = process.env.ADAPTER;
const adapt = hasAdapter ? hasAdapter : 'node';

const getAdapters = (adapt) => {
	switch (adapt) {
		case 'node':
			return nodeAdapter();
		case 'static':
			return staticAdapter();
		case 'vercel':
			return vercelAdapter({
				runtime: 'nodejs18.x',
				split: true
			});
		default:
			console.warn('unknown adapter, using node');
			return nodeAdapter;
	}
};

const adapter = getAdapters(adapt);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess([
			{
				scss: {
					includePaths: ['src']
				}
			}
		]),
		optimizeImports()
	],

	kit: {
		adapter: adapter
	}
};

export default config;
