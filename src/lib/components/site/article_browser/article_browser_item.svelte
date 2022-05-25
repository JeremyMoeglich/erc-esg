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
	<div
		class="outer"
	>
		<div class="img">
			<DbImage id={article.image_link_id} width={'100%'} attr={'w-300,ar-5-3,fo-auto'} />
		</div>
		<div class="text">
			<h3>{article.title}</h3>
			<p>{article.createdAt}</p>
		</div>
		<div class="btns">
			<Button text={'Öffnen'} onclick={`/articles/${article.id}`} />
			{#if $admin_mode}
				<Button
					text={'Löschen'}
					onclick={async () => {
						hidden = true;
						await delete_article(article.id);
					}}
				/>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	.outer {
		display: flex;
		flex-direction: column;
		width: 300px;
		background: rgba(255, 255, 255, 0.32);
		backdrop-filter: blur(8.7px);
		border-radius: 25px;
		overflow: hidden;
		padding-bottom: 20px;
		box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
		transition-duration: 200ms;
		border-bottom: 6px solid var(--secondary-color);
		backface-visibility: hidden;
		color: var(--gray800);
		&:hover {
			border-bottom: 6px solid var(--primary-color);
			box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
			color: var(--secondary-color);
		}
	}
	h3 {
		margin: 0px;
	}
	.text {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 15px;
		margin-left: 5px;
	}
	.btns {
		display: flex;
		align-self: center;
		padding-top: 20px;
		gap: 10px;
	}
</style>
