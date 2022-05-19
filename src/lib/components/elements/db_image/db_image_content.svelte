<script lang="ts">
	import { browser } from '$app/env';

	import { send, receive } from '$lib/scripts/frontend/crossfade';
	import { image_cache_store } from '$lib/scripts/frontend/data/image';
	import { get_image_url } from '$lib/scripts/frontend/fetch/get_image_url';
	export let name: string;
	$: key = `dbimage:${name}`;

	async function update_image_url(name: string) {
		if (browser) {
			const new_image_url = await get_image_url(name);
			if (new_image_url instanceof Error) {
				throw new_image_url;
			}
		}
	}

	$: update_image_url(name);
</script>

{#if $image_cache_store?.[name]}
	<img
		out:send={{ key }}
		in:receive={{ key }}
		src={$image_cache_store[name]}
		alt={name}
	/>
{/if}

<style>
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
