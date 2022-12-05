<script lang="ts">
	import ArticleBrowser from '$lib/components/site/article_browser/article_browser.svelte';
	import Showcase from '$lib/components/site/route/index/showcase.svelte';
</script>

<Showcase />
<div class="imagefilm">
	<h1>Unser Imagefilm</h1>
	<iframe
		src="https://www.youtube.com/embed/MmgB1lPEuVQ"
		title="YouTube video player"
		frameborder="1"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
	/>
</div>

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
	}
</style>
