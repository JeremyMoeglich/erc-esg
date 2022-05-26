import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import { optimizeImports } from 'carbon-preprocess-svelte';

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
		adapter: adapter(),
		prerender: {
			crawl: true
		}
	}
};

export default config;
