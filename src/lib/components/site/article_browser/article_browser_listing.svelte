<script lang="ts">
	import { admin_mode } from '$lib/scripts/frontend/auth/auth_state';
	import type { article_preview } from '$lib/scripts/universal/datatypes';
	import { Add } from 'carbon-icons-svelte';
	import { v4 } from 'uuid';
	import ArticleBrowserItem from './article_browser_item.svelte';

	export let articles: article_preview[];
</script>

<div class="listing">
	{#each articles as article}
		<ArticleBrowserItem {article} />
	{/each}
	{#if $admin_mode}
		<div class="add">
			<a class="add_button" href={`/articles/${v4()}`}><Add size={32}/></a>
		</div>
	{/if}
</div>

<style lang="scss">
	.listing {
		display: flex;
		gap: 30px;
		flex-direction: column;
		padding: 30px;
	}
	.add {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 50px;
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
