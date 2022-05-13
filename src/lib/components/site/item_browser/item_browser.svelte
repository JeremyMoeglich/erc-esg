<script lang="ts">
	import { browser } from '$app/env';

	import { get_items } from '$lib/scripts/frontend/fetch/get_items';

	import type { filter_type, article_preview } from '$lib/scripts/universal/datatypes';
	import ItemBrowserListing from './item_browser_listing.svelte';

	export let filter: filter_type | undefined;
	export let page = 0;

	const items_per_page = 12;

	let items: article_preview[] | undefined = undefined;

	async function update_items(filter: filter_type | undefined, page: number) {
		if (!filter) {
			return;
		}
		if (browser) {
			items = await get_items(
				page * items_per_page,
				page * items_per_page + items_per_page,
				filter
			);
		}
	}

	$: update_items(filter, page);
</script>

This is the item browser listing component.
{#if items}
	<ItemBrowserListing {items} />
{/if}
