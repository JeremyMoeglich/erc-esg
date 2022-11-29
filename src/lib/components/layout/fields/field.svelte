<script lang="ts">
	import DbImage from '$lib/components/elements/db_image/db_image.svelte';
	import { crossfade } from '$lib/scripts/frontend/crossfade';
	import type { article_type, article_preview_type } from '$lib/scripts/universal/datatypes';
	import { articles_cache_store } from '$lib/scripts/frontend/data/articles';
	import { onMount } from 'svelte';
	import { load_article } from '$lib/scripts/frontend/fetch/load_detailed_article';
	import Fullscreen from '../fullscreen.svelte';
	
	export let id: string;
	export let text: string;

	let article_data: article_type | article_preview_type | undefined = undefined;

	let expanded = false;

	function toggle() {
		expanded = !expanded;
	}

	$: article_data = $articles_cache_store?.[id];

	onMount(() => {
		load_article(id);
	});
</script>

<div class="outer">
	<Fullscreen fullscreen={expanded} transition_time={500}>
		<div class="inner" on:click={toggle} on:keypress={toggle}>
			<h3>{article_data?.title ?? ''}</h3>
			<DbImage {id} attr={'w-200,ar-1-1,fo-auto'} />
			<p>{text}</p>
		</div>
	</Fullscreen>
</div>

<style>
	h3 {
		margin-top: 0px;
	}

	.inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px 30px;
		text-align: center;
		background-color: var(--gray000);
		border-radius: 10px;
		box-shadow: 0px 2px 10px -5px var(--secondary-color);
		width: 100%;
		height: 100%;
	}
</style>
