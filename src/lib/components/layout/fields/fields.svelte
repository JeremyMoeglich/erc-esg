<script lang="ts">
	import Field from './field.svelte';
	import { fly } from 'svelte/transition';
	import { in_delay, out_delay } from '$lib/scripts/frontend/data/delay';

	export let fields: Array<{
		title: string;
		image_id: string;
		text: string;
	}>;
	export let title: string;
</script>

<div class="outer" in:fly={{ ...in_delay, y: 20 }} out:fly={{ ...out_delay, y: 20 }}>
	<h2>{title}</h2>
	<div class="main">
		{#each fields as field}
			<div class="field">
				<Field title={field.title} image_id={field.image_id} text={field.text} />
			</div>
		{/each}
	</div>
</div>

<style>
	.main {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
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
