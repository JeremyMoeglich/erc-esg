<script lang="ts">
	import { browser } from '$app/env';

	import { image_cache_store } from '$lib/scripts/frontend/data/image';
	import { get_image_url } from '$lib/scripts/frontend/fetch/get_image_url';
	export let id: string;
	export let attr: string = '';

	async function update_image_url(id: string) {
		if (browser) {
			const new_image_url = await get_image_url(id);
			if (new_image_url instanceof Error) {
				throw new_image_url;
			}
		}
	}

	$: update_image_url(id);
</script>

{#if $image_cache_store?.[id]}
	<img src={`${$image_cache_store[id]}?tr=${attr}`} alt={id} />
{/if}

<style>
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
