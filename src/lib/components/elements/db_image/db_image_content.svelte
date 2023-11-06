<script lang="ts">
	import { image_cache_store } from '$lib/scripts/frontend/data/image';
	import { get_image_url } from '$lib/scripts/frontend/fetch/get_image_url';
	import { browser } from '$app/environment';

	export let id: string;
	export let attr = '';

	async function update_image_url(id: string) {
		const new_image_url = await get_image_url(id);
		if (new_image_url instanceof Error) {
			throw new_image_url;
		}
	}

	$: browser && update_image_url(id);
</script>

{#if $image_cache_store?.[id]}
	<img src={`${$image_cache_store[id]}?tr=${attr}`} alt={id} draggable="false" />
{/if}

<style>
	img {
		width: 100%;
		user-select: none;
	}
</style>
