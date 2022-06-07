<script lang="ts">
	import DbImage from '$lib/components/elements/db_image/db_image.svelte';

	export let title: string;
	export let image_id: string;
	export let text: string;
</script>

<div class="outer">
	<h3>{title}</h3>
	<DbImage id={image_id} attr={'w-200,ar-1-1,fo-auto'} />
	<p>{text}</p>
</div>

<style>
	.outer {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 200px;
		padding: 20px;
		text-align: center;
		background-color: var(--gray000);
		border-radius: 10px;
		box-shadow: 0px 2px 10px -5px var(--secondary-color);
	}
	h3 {
		margin-top: 0px;
	}
</style>
