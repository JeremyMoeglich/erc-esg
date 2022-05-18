<script lang="ts">
	import DbImage from '$lib/components/elements/db_image/db_image.svelte';
	import type { article_preview } from '$lib/scripts/universal/datatypes';

	export let articles: article_preview[];
</script>

<div>
	{#each articles as article}
		<DbImage name={article.image_link.name} click={`/articles/${article.id}`} />
	{/each}
</div>
