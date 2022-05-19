<script lang="ts">
	import { admin_mode } from '$lib/scripts/frontend/auth/auth_state';
	import { image_cache_store } from '$lib/scripts/frontend/data/image';
	import { upload_image } from '$lib/scripts/frontend/fetch/upload_image';
	import { Edit } from 'carbon-icons-svelte';
	import { get } from 'svelte/store';
	import DbImageContent from './db_image_content.svelte';
	export let id: string;
	export let click: string | (() => void) | undefined = undefined;
	export let width: number | string | undefined = undefined;

	let files: FileList | undefined = undefined;

	async function update_image() {
		if (files && files.length > 0) {
			if (files.length > 1) {
				throw new Error('Too many files');
			}
			const file = files[0];
			const image_url = await upload_image(id, file);
			if (image_url instanceof Error) {
				throw image_url;
			}
			const current_image_url_store = get(image_cache_store);
			current_image_url_store[id] = image_url;
			image_cache_store.set(current_image_url_store);
		}
	}
	$: str_width = typeof width === 'number' ? `${width}px` : width;
</script>

<div class="outer" style:width={str_width}>
	<div class="content">
		{#if typeof click === 'function'}
			<button on:click={click}>
				<DbImageContent {id} />
			</button>
		{:else if typeof click === 'string'}
			<a href={click}>
				<DbImageContent {id} />
			</a>
		{:else}
			<div>
				<DbImageContent {id} />
			</div>
		{/if}
	</div>
	{#if $admin_mode}
		<div class="overlay">
			<div class="edit_file_input">
				<div class="edit_file_symbol">
					<Edit size={24} />
				</div>
				<input type="file" bind:files on:change={update_image} />
			</div>
		</div>
	{/if}
</div>

<style>
	.outer {
		display: inline-block;
		position: relative;
		height: fit-content;
		width: fit-content;
	}
	.content {
		height: fit-content;
	}
	.overlay {
		position: absolute;
		padding: 10px;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
		background-color: rgba(0, 0, 0, 0.349);
		filter: opacity(0);
		transition-duration: 200ms;
	}
	.overlay:hover {
		filter: opacity(1);
	}
	.edit_file_input {
		position: relative;
		background-color: var(--gray200);
		color: var(--secondary-color);
		border-radius: 40%;
		width: 50px;
		height: 50px;
	}
	.edit_file_input:hover {
		background-color: var(--gray000);
		color: var(--primary-color);
	}
	.edit_file_symbol {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.edit_file_input > input {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
</style>
