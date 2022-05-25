<script lang="ts">
	import Field from './field.svelte';

	export let fields: Array<{
		title: string;
		image_id: string;
	}>;
	export let title: string;
</script>

<div class="outer">
	<h2>{title}</h2>
	<div class="main">
		{#each fields as field}
			<Field title={field.title} image_id={field.image_id} />
		{/each}
	</div>
</div>

<style>
	.main {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 30px;
		padding: 30px;
		width: 100%;
	}
	.outer {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
