<script lang="ts">
	import DbImage from '$lib/components/elements/db_image/db_image.svelte';
	import Button from '$lib/components/elements/button.svelte';
	import Inplaceedit from '$lib/components/elements/inplaceedit.svelte';
	import { admin_mode } from '$lib/scripts/frontend/auth/auth_state';
	import { articles_cache_store } from '$lib/scripts/frontend/data/articles';
	import { load_article } from '$lib/scripts/frontend/fetch/load_detailed_article';
	import { is_loading } from '$lib/scripts/frontend/loading_store';
	import type { article_type, article_preview_type } from '$lib/scripts/universal/datatypes';
	import { get } from 'svelte/store';
	import { browser } from '$app/environment';
	import { update_article } from '$lib/scripts/frontend/fetch/update_article';
	import { goto } from '$app/navigation';
	import Editor from './editor.svelte';

	export let article_id: string;
	export let hidden: boolean;
	export let compact: boolean;

	let state: 'loading' | 'not_found' | 'loaded' | undefined = 'loading';

	async function load(article_id: string) {
		if (browser && article_id) {
			state = (await load_article(article_id)) ? 'loaded' : 'not_found';
			if (state === 'not_found') {
				article_obj = {
					content: '',
					id: article_id,
					image_link_id: article_id,
					title: 'Leerer Artikel',
					createdAt: JSON.stringify(new Date()),
					hidden
				};
			}
		}
	}

	$: {
		state = 'loading';
		const preview_in_cache = get(articles_cache_store)[article_id] ? true : false;
		if (!preview_in_cache) {
			is_loading.set(true);
		}
		load(article_id);
		is_loading.set(false);
		state = undefined;
	}

	let get_article_data: (() => Promise<string>) | undefined;

	let article_obj: article_preview_type | article_type | undefined = undefined;
	$: article_obj = $articles_cache_store?.[article_id];
</script>

<div class="outer">
	{#if article_obj}
		<div class="image">
			<DbImage
				id={article_obj?.image_link_id ?? article_id}
				width={'100%'}
				attr={'w-200,ar-1-1,fo-auto'}
			/>
		</div>
		<div class="article">
			<h1>
				{#if state !== 'loading'}
					{#if $admin_mode}
						<div class="title">
							<Inplaceedit
								value={article_obj.title}
								on:submit={({ detail: value }) => {
									if (!article_obj?.title) {
										throw new Error('article has no title, but title is shown');
									}
									article_obj.title = value;
								}}
							/>
							<p class="id">ID: {article_obj.id}</p>
						</div>
					{:else}
						{article_obj.title}
					{/if}
				{/if}
			</h1>
			{#if 'content' in article_obj}
				<div>
					{#if $admin_mode}
						<div class="editor">
							<Editor data={article_obj.content} editable={true} bind:get_data={get_article_data} />
						</div>
						<div class="save_button">
							<Button
								text={'Speichern'}
								onclick={async () => {
									if (!get_article_data) {
										throw new Error('get_article_data is undefined');
									}
									if (article_obj === undefined) {
										throw new Error('article_obj became undefined during save');
									}
									if (!('content' in article_obj)) {
										throw new Error('article has no content, but content is shown');
									}
									const new_content = await get_article_data();
									article_obj.content = new_content;
									update_article(article_obj);
									await goto('/blog');
								}}
							/>
						</div>
					{:else}
						<div class="editor">
							<Editor data={article_obj.content} editable={false} />
						</div>
					{/if}
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	h1 {
		margin: 0px;
		font-size: 1.5em;
		max-width: fit-content;
	}
	.id {
		font-size: 0.8em;
		color: gray;
	}
	.title {
		display: flex;
		flex-direction: row;
		gap: 1em;
		align-items: center;
	}
	.outer {
		display: flex;
		flex-wrap: wrap-reverse;
		justify-content: center;
		width: 90%;
		gap: 40px;
	}
	.article {
		width: 100%;
	}
	.save_button {
		display: flex;
		justify-content: center;
		margin-top: 2rem;
	}
</style>
