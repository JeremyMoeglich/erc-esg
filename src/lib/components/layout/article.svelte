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
	import LeftCenter from './left_center.svelte';
	import TextBox from './text_box.svelte';

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

	let article_obj: article_preview_type | article_type | undefined = undefined;
	$: article_obj = $articles_cache_store?.[article_id];

	const compact_image_width = 200;
	const large_image_width = 300;
</script>

<div class="outer" style:padding={compact ? '0px 50px' : '0px 90px'}>
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
				<LeftCenter
					position={compact ? 'center' : 'left'}
					transition_time={500}
					shrink_to={`${compact_image_width}px`}
				>
					<div class="image">
						<DbImage
							id={article_obj?.image_link_id ?? article_id}
							width={`${compact_image_width}px`}
							attr={`w-${compact_image_width},ar-1-1,fo-auto`}
						/>
					</div>
				</LeftCenter>
				{#if 'content' in article_obj}
					<div class="content">
						{#if $admin_mode && !compact}
							<div class="editor">
								<TextBox content={article_obj.content} editable={true} />
							</div>
							<div class="save_button">
								<Button
									text={'Speichern'}
									onclick={async () => {
										if (article_obj === undefined) {
											throw new Error('article_obj became undefined during save');
										}
										if (!('content' in article_obj)) {
											throw new Error('article has no ctitleontent, but content is shown');
										}
										update_article(article_obj);
										await goto('/blog');
									}}
								/>
							</div>
						{:else}
							<div class="editor">
								<TextBox bind:content={article_obj.content} editable={false} />
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
		position: relative;
		width: 100%;
	}
	.title {
		display: flex;
		flex-direction: row;
		gap: 1em;
		align-items: center;
		justify-content: center;
		white-space: nowrap;
		text-align: center;
		transition-duration: 500ms;
		transition-property: width;
		font-size: 20px;
	}
	.side_alignment {
		display: flex;
		flex-wrap: wrap;
	}
	.outer {
		display: flex;
		flex-direction: column;
		gap: 20px;
		width: 100%;
		flex-wrap: wrap;
	}
	.save_button {
		display: flex;
		justify-content: center;
		margin-top: 2rem;
	}
	.content {
		flex-grow: 1;
	}
</style>
