<script lang="ts">
	import { browser } from '$app/env';
	import { update_index } from '$lib/scripts/frontend/data/local_changes';
	import { get_articles } from '$lib/scripts/frontend/fetch/get_articles';
	import type { article_preview, filter_type } from '$lib/scripts/universal/datatypes';
	import ArticleBrowserListing from './article_browser_listing.svelte';
	import SearchBar from './search_bar.svelte';

	export let page = 0;

	let search_value = '';

	let filter: filter_type = {
		search: ''
	};

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

	$: $update_index, update_items(filter, page);
</script>

<div class="outer">
	<div>
		<SearchBar
			bind:value={search_value}
			on_search={async () => {
				filter.search = search_value;
			}}
		/>
	</div>
	{#if articles}
		<ArticleBrowserListing {articles} />
	{/if}
</div>

<style>
	.outer {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		gap: 20px;
		padding: 30px 90px;
	}
</style>
