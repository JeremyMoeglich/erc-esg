import { sveltekit } from '@sveltejs/kit/vite';
import svgLoader from 'vite-plugin-svelte-svg'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		svgLoader({
			requireSuffix: false,
		}),
		sveltekit()
	]
};

export default config;
