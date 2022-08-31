<script lang="ts">
	import { page } from '$app/stores';
	import DbImage from '$lib/components/elements/db_image/db_image.svelte';
	import { admin_mode } from '$lib/scripts/frontend/auth/auth_state';
	import { articles_cache_store } from '$lib/scripts/frontend/data/articles';
	import { load_article } from '$lib/scripts/frontend/fetch/load_detailed_article';
	import { is_loading } from '$lib/scripts/frontend/loading_store';
	import type { article_type, article_preview_type } from '$lib/scripts/universal/datatypes';
	import { get } from 'svelte/store';
	import cuid from 'cuid';
	import { Editor, Viewer } from 'bytemd';
	import 'bytemd/dist/index.css';
	import de from 'bytemd/locales/de.json';
	import type { EditorConfiguration } from 'codemirror';

	const sanitize: <T>(v: T) => T = (v) => v;

	let article_id: string = get(page).params.article_id;
	let state: 'loading' | 'not_found' | 'loaded' | undefined = 'loading';
	$: article_id = $page.params.article_id;

	async function load(article_id: string) {
		if (browser && article_id) {
			state = (await load_article(article_id)) ? 'loaded' : 'not_found';
			if (state === 'not_found') {
				article_obj = {
					content: '',
					id: article_id,
					image_link_id: article_id,
					title: 'Leerer Artikel',
					createdAt: JSON.stringify(new Date())
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
	$: article_obj = $articles_cache_store?.[article_id];

	import gfm from '@bytemd/plugin-gfm';
	import { browser } from '$app/environment';
	import Button from '$lib/components/elements/button.svelte';
	import Inplaceedit from '$lib/components/elements/inplaceedit.svelte';
	import { update_article } from '$lib/scripts/frontend/fetch/update_article';
	import { goto } from '$app/navigation';
	import { upload_image } from '$lib/scripts/frontend/fetch/upload_image';

	const plugins = [gfm()];

	function content_change(e: CustomEvent<{ value: string }>) {
		if (!article_obj || !('content' in article_obj)) {
			throw new Error('article has no content, but content is shown');
		}
		article_obj.content = e.detail.value;
	}
	const uploadImages: (files: File[]) => Promise<
		{
			url: string;
			alt: string;
			title: string;
		}[]
	> = async (files: File[]) => {
		const result = await Promise.all(
			files.map(async (file) => {
				return {
					url: await upload_image(cuid(), file),
					alt: file.name,
					title: file.name
				};
			})
		);
		return result.map((image) => {
			const url = image.url;
			if (typeof url === 'string') {
				return {
					url: `${url}?tr=w-300`,
					alt: image.alt,
					title: image.title
				};
			}
			throw new Error('upload_image returned Error');
		});
	};

	const config: Omit<EditorConfiguration, 'value' | 'placeholder'> = {};
</script>

<div class="outer">
	{#if article_obj}
		<div class="image">
			<DbImage id={article_obj?.image_link_id ?? article_id} width={'300px'} />
		</div>
		<div class="article">
			<h1>
				{#if state !== 'loading'}
					{#if $admin_mode}
						<Inplaceedit
							value={article_obj.title}
							on:submit={({ detail: value }) => {
								if (!article_obj?.title) {
									throw new Error('article has no title, but title is shown');
								}
								article_obj.title = value;
							}}
						/>
					{:else}
						{article_obj.title}
					{/if}
				{/if}
			</h1>
			{#if 'content' in article_obj}
				<div>
					{#if $admin_mode}
						<div class="editor">
							<Editor
								value={article_obj.content}
								{plugins}
								on:change={content_change}
								locale={de}
								{uploadImages}
								placeholder="Schreibe hier deinen Artikel..."
								editorConfig={config}
							/>
						</div>
						<div class="save_button">
							<Button
								text={'Speichern'}
								onclick={async () => {
									if (article_obj === undefined) {
										throw new Error('article_obj became undefined during save');
									}
									if (!('content' in article_obj)) {
										throw new Error('article has no content, but content is shown');
									}
									update_article(article_obj);
									await goto('/blog');
								}}
							/>
						</div>
					{:else}
						<Viewer value={article_obj.content} {plugins} {sanitize} />
					{/if}
				</div>
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

	@media (max-width: 1200px) {
		.outer {
			flex-direction: column;
		}
		.image {
			align-self: center;
		}
	}
	.article {
		width: 100%;
	}
	.editor :global(*) {
		z-index: 3;
	}
	.save_button {
		display: flex;
		justify-content: center;
		margin-top: 2rem;
	}
</style>
