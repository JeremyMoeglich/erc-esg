<script lang="ts">
	import ArticleBrowser from '$lib/components/site/article_browser/article_browser.svelte';
	import Showcase from '$lib/components/site/route/index/showcase.svelte';
</script>

<Showcase />


<ArticleBrowser />

<style>
	.imagefilm {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	iframe {
		border: 16px solid var(--primary-hint-grey);
		width: 100%;
		aspect-ratio: 16 / 9;
		max-width: 800px;
	}
</style>
