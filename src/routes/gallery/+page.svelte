<script lang="ts">
	import { browser } from '$app/environment';
	import Button from '$lib/components/elements/button.svelte';
	import DbImage from '$lib/components/elements/db_image/db_image.svelte';
	import { admin_mode } from '$lib/scripts/frontend/auth/auth_state';
	import { get_gallery_images } from '$lib/scripts/frontend/fetch/get_gallery_images';
	import { onMount } from 'svelte';
	import { v4 } from 'uuid';
	let images: string[] | undefined = undefined;

	onMount(async () => {
		if (browser) {
			images = await get_gallery_images();
		}
	});
</script>

<div class="main">
	{#if images}
		{#each images as image_id}
			<div class="image">
				<DbImage id={image_id} width={'400px'} gallery={true} attr={`w-400`} />
			</div>
		{/each}
		{#if $admin_mode}
			<div class="add">
				<Button
					onclick={async () => {
						images = [...(images ?? []), v4()];
					}}
					text={'Add Image'}
				/>
			</div>
		{/if}
	{:else}
		<div>Loading...</div>
	{/if}
</div>

<style>
	.main {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(400px, 100%), 1fr));
		gap: 10px;
		padding: 30px 60px;
		width: 100%;
		align-items: center;
		justify-items: center;
	}

	.image {
		border: 2px solid var(--primary-hint-dark);
	}
</style>
