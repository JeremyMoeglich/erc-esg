<script lang="ts">
	import { admin_mode } from '$lib/scripts/frontend/auth/auth_state';
	import type { article_preview } from '$lib/scripts/universal/datatypes';
	import { Add } from 'carbon-icons-svelte';

	import ArticleBrowserItem from './article_browser_item.svelte';
	import { send, receive } from '$lib/scripts/frontend/transitions';
	import { flip } from 'svelte/animate';
	import cuid from 'cuid';

	export let articles: article_preview[];
</script>

<div class="listing">
	{#if $admin_mode}
		<div class="add">
			<a class="add_button" href={`/articles/${cuid()}`}><Add size={32} /></a>
		</div>
	{/if}
	{#each articles as article (article)}
		<div
			class="transition_wrapper"
			out:send={{ key: JSON.stringify(article) }}
			in:receive={{ key: JSON.stringify(article) }}
			animate:flip={{ duration: 500 }}
		>
			<ArticleBrowserItem {article} />
		</div>
	{/each}
</div>

<style lang="scss">
	.listing {
		display: grid;
		gap: 30px;
		padding: 2vw;
		width: 100%;
		grid-template-columns: repeat(auto-fit, min(100%, 300px));
		place-content: center;
	}
	.transition_wrapper {
		width: 300px;
		max-width: 100%;
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
