<script lang="ts">
	import Fullscreen from '../fullscreen.svelte';
	import Article from '../article.svelte';
	
	export let id: string;

	let expanded = false;

	function toggle() {
		expanded = !expanded;
	}
</script>

<div class="outer">
	<Fullscreen fullscreen={expanded} transition_time={500}>
		<div class="inner" on:click={toggle} on:keypress={toggle}>
			<Article article_id={id} hidden={true} compact={!expanded}/>
		</div>
	</Fullscreen>
</div>

<style>
	.inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px 30px;
		text-align: center;
		background-color: var(--gray000);
		border-radius: 10px;
		box-shadow: 0px 2px 10px -5px var(--secondary-color);
		width: 100%;
		height: 100%;
	}
	.outer {
		width: 100%;
		height: 100%;
		max-height: 350px;
	}
</style>
