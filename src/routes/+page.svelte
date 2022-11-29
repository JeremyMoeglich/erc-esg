<script lang="ts">
	import Fullscreen from '$lib/components/layout/fullscreen.svelte';
	import ArticleBrowser from '$lib/components/site/article_browser/article_browser.svelte';
	import Showcase from '$lib/components/site/route/index/showcase.svelte';

	let test = false;
</script>

<Showcase />
<ArticleBrowser />

<div class="outer_test">
	<Fullscreen fullscreen={test} transition_time={500}>
		<div class="testbox" on:click={() => (test = !test)} />
	</Fullscreen>
</div>

<style>
	.testbox {
		width: 100%;
		height: 100%;
		background-color: red;
	}
	.outer_test {
		width: 500px;
		height: 500px;
	}
</style>
