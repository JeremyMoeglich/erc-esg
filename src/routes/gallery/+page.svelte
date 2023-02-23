<script lang="ts">
	import { browser } from '$app/environment';
	import Button from '$lib/components/elements/button.svelte';
	import DbImage from '$lib/components/elements/db_image/db_image.svelte';
	import Inplaceedit from '$lib/components/elements/inplaceedit.svelte';
	import { admin_mode } from '$lib/scripts/frontend/auth/auth_state';
	import { get_gallery_images } from '$lib/scripts/frontend/fetch/get_gallery_images';
	import { update_category } from '$lib/scripts/frontend/fetch/update_category';
	import { onMount } from 'svelte';
	import { v4 } from 'uuid';
	let categories: Awaited<ReturnType<typeof get_gallery_images>> | undefined = undefined;

	onMount(async () => {
		if (browser) {
			categories = await get_gallery_images();
		}
	});
	let is_open: undefined | number = undefined;
</script>

<div class="main">
	{#if categories}
		{#each categories as category, e}
			<h2>
				<Inplaceedit
					value={category.name}
					on:submit={({ detail: value }) => {
						update_category(category.id, value, category.images);
					}}
				/>
			</h2>

			<div class="imagerow">
				{#each category.images.slice(0, e == is_open ? undefined : 5) as image, i}
					{@const expand_element = i === 4 && e !== is_open}
					<button
						class="image"
						on:click={() => {
							is_open = e;
						}}
					>
						<div class:expand={expand_element}>
							<DbImage id={image} width="200px" />
							{#if $admin_mode}
								{image}
							{/if}
						</div>
						{#if expand_element}
							<p class="more_text">Mehr...</p>
						{/if}
					</button>
				{/each}
				{#if $admin_mode}
					<Button
						text="+"
						onclick={() => {
							category.images = [...category.images, v4()];
							update_category(category.id, category.name, category.images);
						}}
					/>
				{/if}
			</div>
			<div class="divider" />
		{/each}
		{#if $admin_mode}
			<Button
				text="New Category"
				onclick={() => {
					const id = v4();
					update_category(id, 'Kein Name', []);
					categories?.push({
						id,
						name: 'Hier Klicken um Namen zu verändern',
						images: []
					});
					categories = categories;
				}}
			/>
		{/if}
	{:else}
		<div>Loading...</div>
	{/if}
</div>

<style>
	.main {
		display: flex;
		gap: 10px;
		padding: 30px 60px;
		width: 100%;
		justify-items: center;
		flex-direction: column;
	}
	.expand {
		filter: grayscale(0.5) brightness(0.3);
	}
	.imagerow {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 40px;
	}
	.image {
		position: relative;
	}
	.more_text {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		color: white;
		text-decoration: underline;
	}
	.divider {
		height: 2px;
		width: 100%;
		background-color: grey;
		opacity: 0.5;
	}
</style>
