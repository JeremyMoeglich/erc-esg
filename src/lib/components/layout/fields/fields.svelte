<script lang="ts">
	import Field from './field.svelte';

	export let ids: Array<string>;
	export let title: string;
</script>

<div class="outer">
	<h2>{title}</h2>
	<div class="main">
		{#each ids as id}
			<Field {id} />
		{/each}
	</div>
</div>

<style>
	.main {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(400px, 100%), 1fr));
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
