<script lang="ts">
	import { browser } from '$app/env';
	import { get_articles } from '$lib/scripts/frontend/fetch/get_articles';
	import type { article_preview, filter_type } from '$lib/scripts/universal/datatypes';
	import ArticleBrowserListing from './article_browser_listing.svelte';

	import ItemBrowserListing from './article_browser_listing.svelte';

	export let filter: filter_type | undefined;
	export let page = 0;

	const articles_per_page = 12;

	let articles: article_preview[] | undefined = undefined;

	async function update_items(filter: filter_type | undefined, page: number) {
		if (!filter) {
			return;
		}
		if (browser) {
			articles = await get_articles(
				page * articles_per_page,
				page * articles_per_page + articles_per_page,
				filter
			);
		}
	}

	$: update_items(filter, page);
</script>

This is the item browser listing component.
{#if articles}
	<ArticleBrowserListing {articles} />
{/if}
