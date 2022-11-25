<script lang="ts">
	import { admin_mode } from '$lib/scripts/frontend/auth/auth_state';
	import type { article_preview_type } from '$lib/scripts/universal/datatypes';
	import { Add } from 'carbon-icons-svelte';

	import ArticleBrowserItem from './article_browser_item.svelte';

	import { v4 } from 'uuid';

	export let articles: article_preview_type[];
</script>

<div class="listing">
	{#if $admin_mode}
		<div class="add">
			<a class="add_button" href={`/articles/${v4()}`}><Add size={32} /></a>
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
	.add_button {
		display: flex;
		justify-content: center;
		align-items: center;

		width: 50px;
		height: 50px;
		padding: 10px;
		border: 3px solid var(--secondary-color);
		color: var(--secondary-color);
		background-color: var(--gray200);
		cursor: pointer;
		&:hover {
			background-color: var(--gray300);
		}
	}
</style>
