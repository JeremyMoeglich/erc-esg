<script lang="ts">
	import Button from '$lib/components/elements/button.svelte';
	import DbImage from '$lib/components/elements/db_image/db_image.svelte';
	import { admin_mode } from '$lib/scripts/frontend/auth/auth_state';

	import type { article_preview } from '$lib/scripts/universal/datatypes';
	import { delete_article } from '$lib/scripts/frontend/fetch/delete_article';
	export let article: article_preview;

	let hidden = false;
</script>

{#if !hidden}
	<div class="outer">
		<a href={`/articles/${article.id}`}>
			<div class="img">
				<DbImage id={article.image_link_id} width={'100%'} />
			</div>
			<div>
				<h3>{article.title}</h3>
				<p>{article.createdAt}</p>
			</div>
		</a>
		{#if $admin_mode}
			<Button
				text={'Löschen'}
				onclick={async () => {
					await delete_article(article.id);
					hidden = true;
				}}
			/>
		{/if}
	</div>
{/if}

<style>
	.outer {
		display: flex;
	}
	a {
		display: flex;
		text-decoration: none;
		color: inherit;
		width: 100%;
		gap: 30px;
	}
	.img {
		width: 20%;
		max-height: 200px;
		overflow-y: hidden;
	}
</style>
