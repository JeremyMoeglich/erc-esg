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
	import TextBox from './text_box.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { isEqual } from 'lodash-es';

	export let article_id: string;
	export let hidden: boolean;
	export let compact: boolean;
	export let preview = '';

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

	let article_obj: article_preview_type | article_type | undefined = undefined;
	let initial_article_obj: article_preview_type | article_type | undefined = undefined;
	$: $articles_cache_store,
		(() => {
			article_obj = $articles_cache_store?.[article_id] ?? article_obj;
			if (initial_article_obj === undefined) {
				initial_article_obj = article_obj;
			}
		})();

	const compact_image_width = 200;
	const large_image_width = 100;

	let shrunk: boolean = false;

	function page_close_listener() {
		if (isEqual(article_obj, initial_article_obj)) {
			return;
		}
		const message = 'Es gibt ungespeicherte Änderungen. Möchtest du die Seite wirklich verlassen?';
		if (confirm(message)) {
			return;
		}
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('beforeunload', page_close_listener);
		}
	});
	onDestroy(() => {
		if (browser) {
			window.removeEventListener('beforeunload', page_close_listener);
		}
	});
</script>

<div class="outer">
	{#if article_obj}
		<div>
			<div class="title">
				{#if state !== 'loading'}
					{#if $admin_mode}
						<div>
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
			</div>
			<div class="side_alignment">
				<div class="image">
					<DbImage
						id={article_obj?.image_link_id ?? article_id}
						width={`${compact ? compact_image_width : large_image_width}px`}
						attr={`w-${large_image_width},ar-1-1,fo-auto`}
					/>
				</div>
				{#if 'content' in article_obj}
					<div class="content" class:left={shrunk || !compact}>
						{#if shrunk || !compact}
							{#if $admin_mode}
								<div class="editor">
									<TextBox bind:content={article_obj.content} editable={true} />
								</div>
								<div class="save_button">
									<Button
										text={'Speichern'}
										onclick={async () => {
											is_loading.set(true);
											try {
												if (article_obj === undefined) {
													throw new Error('article_obj became undefined during save');
												}
												if (!('content' in article_obj)) {
													throw new Error('article has no ctitleontent, but content is shown');
												}
												update_article(article_obj);
											} finally {
												is_loading.set(false);
											}
										}}
									/>
									{#if !isEqual(article_obj, initial_article_obj)}
										<p class="unsaved">Es gibt ungespeicherte Änderungen.</p>
									{/if}
								</div>
							{:else}
								<div class="editor">
									<TextBox bind:content={article_obj.content} editable={false} />
								</div>
							{/if}
						{:else}
							<div>
								{preview}
							</div>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.id {
		font-size: 0.8em;
		color: gray;
	}
	.image {
		display: flex;
		justify-content: center;
		width: 100%;
	}
	.title {
		display: flex;
		flex-direction: row;
		gap: 1em;
		align-items: center;
		justify-content: center;
		text-align: center;
		transition-duration: 500ms;
		transition-property: width;
		font-size: 20px;
	}
	.side_alignment {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		justify-content: center;
		transition-duration: 500ms;
		transition-property: margin-top;
	}
	.outer {
		display: flex;
		flex-direction: column;
		width: 100%;
		flex-wrap: wrap;
	}
	.save_button {
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 20px;
		margin-top: 2rem;
	}
	.left {
		text-align: left;
	}
</style>
