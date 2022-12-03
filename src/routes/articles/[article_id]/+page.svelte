<script lang="ts">
	import { get } from 'svelte/store';
	import { page } from '$app/stores';
	import Article from '$lib/components/layout/article.svelte';

	let article_id: string = get(page).params.article_id;
	$: article_id = $page.params.article_id;
</script>

<div class="outer">
	<Article {article_id} hidden={false} compact={false} />
</div>

<style>
	.outer {
		width: 100%;
		height: 100%;
		padding: 20px 30px;
	}
</style>
