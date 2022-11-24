<script lang="ts">
	import Field from './field.svelte';
	
	export let fields: Array<{
		title: string;
		image_id: string;
		text: string;
	}>;
	export let title: string;
</script>

<div class="outer">
	<h2>{title}</h2>
	<div class="main">
		{#each fields as field}
			<Field title={field.title} image_id={field.image_id} text={field.text} />
		{/each}
	</div>
</div>

<style>
	.main {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 10px;
		padding: 30px 60px;
		width: 100%;
	}
	.outer {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
