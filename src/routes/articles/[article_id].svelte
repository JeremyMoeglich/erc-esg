<script lang="ts">
	import { page } from '$app/stores';
	import DbImage from '$lib/components/elements/db_image/db_image.svelte';
	import { admin_mode } from '$lib/scripts/frontend/auth/auth_state';
	import { articles_cache_store } from '$lib/scripts/frontend/data/articles';
	import { load_article } from '$lib/scripts/frontend/fetch/load_detailed_article';
	import { is_loading } from '$lib/scripts/frontend/loading_store';
	import type { article, article_preview } from '$lib/scripts/universal/datatypes';
	import { hasProperty } from 'functional-utilities';
	import { noop } from 'svelte/internal';
	import { get } from 'svelte/store';
	import { v4 } from 'uuid';
	import { Editor, Viewer } from 'bytemd';
	import 'bytemd/dist/index.css';
	import de from 'bytemd/locales/de.json';

	let article_id: string = get(page).params.article;
	let state: 'loading' | 'not_found' | 'loaded' = 'loading';
	$: article_id = $page.params.article;

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
	$: article = $articles_cache_store?.[article_id] ?? {
		content: 'leerer Artikel',
		image_link: {
			name: v4(),
			url: 'https://via.placeholder.com/300x200'
		},
		id: v4(),
		title: 'Artikel nicht gefunden'
	};

	import gfm from '@bytemd/plugin-gfm';
	import { browser } from '$app/env';

	const plugins = [gfm()];

	function content_change(event: CustomEvent<{ value: string }>) {
		if (!hasProperty(article, 'content')) {
			throw new Error('article has no content, but content is shown');
		}
		article.content = event.detail.value;
	}
</script>

<div>
	{#if article}
		<DbImage name={article?.image_link?.name ?? article_id} click={noop} />
		<h1>
			{#if state !== 'loading'}
				{article.title}
				{#if $admin_mode}
					<a href={`/admin/articles/${article_id}`}>
						<i class="fas fa-edit" />
					</a>
				{/if}
			{/if}
		</h1>
		{#if hasProperty(article, 'content')}
			<template>
				{#if $admin_mode}
					<Editor value={article.content} {plugins} on:change={content_change} locale={de} />
				{:else}
					<Viewer value={article.content} {plugins} locale={de} />
				{/if}
			</template>
		{/if}
	{/if}
</div>
