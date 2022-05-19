<script lang="ts">
	import { page } from '$app/stores';
	import DbImage from '$lib/components/elements/db_image/db_image.svelte';
	import { admin_mode } from '$lib/scripts/frontend/auth/auth_state';
	import { articles_cache_store } from '$lib/scripts/frontend/data/articles';
	import { load_article } from '$lib/scripts/frontend/fetch/load_detailed_article';
	import { is_loading } from '$lib/scripts/frontend/loading_store';
	import type { article, article_preview } from '$lib/scripts/universal/datatypes';
	import { hasProperty } from 'functional-utilities';
	import { get } from 'svelte/store';
	import { v4 } from 'uuid';
	import { Editor, Viewer } from 'bytemd';
	import 'bytemd/dist/index.css';
	import de from 'bytemd/locales/de.json';

	let article_id: string = get(page).params.article;
	let state: 'loading' | 'not_found' | 'loaded' = 'loading';
	$: article_id = $page.params.article_id;

	async function load(article_id: string) {
		if (browser) {
			state = (await load_article(article_id)) ? 'loaded' : 'not_found';
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
	}
	let article: article_preview | article | undefined = undefined;
	$: article =
		$articles_cache_store?.[article_id] ??
		({
			content: 'leerer Artikel',
			image_link_id: article_id,
			id: article_id,
			createdAt: JSON.stringify(new Date()),
			title: 'Artikel nicht gefunden'
		} as article);

	import gfm from '@bytemd/plugin-gfm';
	import { browser } from '$app/env';
	import Button from '$lib/components/elements/button.svelte';
	import Inplaceedit from '$lib/components/elements/inplaceedit.svelte';
	import { update_article } from '$lib/scripts/frontend/fetch/update_article';

	const plugins = [gfm()];

	function content_change(event: CustomEvent<{ value: string }>) {
		if (!hasProperty(article, 'content')) {
			throw new Error('article has no content, but content is shown');
		}
		article.content = event.detail.value;
	}
</script>

<div class="outer">
	{#if article}
		<DbImage id={article?.image_link_id ?? article_id} width={'30%'} />
		<div class="article">
			<h1>
				{#if state !== 'loading'}
					{#if $admin_mode}
						<Inplaceedit
							value={article.title}
							on:submit={({ detail: value }) => {
								if (!article?.title) {
									throw new Error('article has no title, but title is shown');
								}
								article.title = value;
							}}
						/>
					{:else}
						{article.title}
					{/if}
				{/if}
			</h1>
			{#if hasProperty(article, 'content')}
				<template>
					{#if $admin_mode}
						<Editor value={article.content} {plugins} on:change={content_change} locale={de} />
						<div class="save_button">
							<Button
								text={'Speichern'}
								onclick={() => {
									if (!hasProperty(article, 'content')) {
										throw new Error('article has no content, but content is shown');
									}
									update_article(article);
								}}
							/>
						</div>
					{:else}
						<Viewer value={article.content} {plugins} />
					{/if}
				</template>
			{/if}
		</div>
	{/if}
</div>

<style>
	.outer {
		display: flex;
		width: 90%;
		margin: 50px auto;
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
