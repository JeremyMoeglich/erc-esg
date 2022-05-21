import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';
import { optimizeImports } from 'carbon-preprocess-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess([
			{
				scss: { includePaths: ['src'] }
			}
		]),
		optimizeImports()
	],

	kit: {
		adapter: adapter({
			split: true
		})
	}
};

export default config;
