<script lang="ts">
	import { admin_mode } from '$lib/scripts/frontend/auth/auth_state';
	import type { article_preview_type } from '$lib/scripts/universal/datatypes';

	import ArticleBrowserItem from './article_browser_item.svelte';

	import { v4 } from 'uuid';
	import Button from '$lib/components/elements/button.svelte';

	export let articles: article_preview_type[];
</script>

<div class="listing">
	{#if $admin_mode}
		<div class="add">
			<Button onclick={`/articles/${v4()}`} text={'Add article'} />
		</div>
	{/if}
	{#each articles as article (article)}
		<ArticleBrowserItem {article} />
	{/each}
</div>

<style lang="scss">
	.listing {
		display: grid;
		justify-content: center;
		gap: 30px;
		padding: 2vw;
		width: 100%;
		grid-template-columns: repeat(auto-fit, min(100%, 300px));
	}
	.add {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 300px;
	}
</style>
