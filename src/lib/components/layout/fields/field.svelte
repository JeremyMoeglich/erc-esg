<script lang="ts">
	import DbImage from '$lib/components/elements/db_image/db_image.svelte';

	export let title: string;
	export let image_id: string;
</script>

<div class="outer">
	<DbImage id={image_id} attr={'w-200,ar-1-1,fo-auto'} />
	<h3>{title}</h3>
</div>

<style>
	.outer {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
