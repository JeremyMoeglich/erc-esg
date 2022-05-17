<script lang="ts">
	import type { article_preview } from '$lib/scripts/universal/datatypes';

	export let articles: article_preview[];
</script>

<div>
	{#each articles as article}
		{@const key = `image=${article.id}`}
		<a href={`/item${article.id}`}>
			<img out:send={{ key }} in:receive={{ key }} src={article.image_url} alt={article.title} />
		</a>
	{/each}
</div>
