<script lang="ts">
	import { admin_mode } from '$lib/scripts/frontend/auth/auth_state';
	import { Edit } from 'carbon-icons-svelte';
	import DbImageContent from './db_image_content.svelte';
	export let name: string;
	export let click: string | (() => void);

	let value: HTMLImageElement | undefined = undefined;
	async function update_image() {
		if (value) {
			await fetch(`/api/upload_image`, {
				method: 'POST',
				body: JSON.stringify({
					image: value.src,
					name: name
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
	}
</script>

<div class="outer">
	{#if typeof click === 'function'}
		<button on:click={click}>
			<DbImageContent {name} />
		</button>
	{:else}
		<a href={click}>
			<DbImageContent {name} />
		</a>
	{/if}
	{#if $admin_mode}
		<div class="overlay">
			<div class="edit_file_input">
				<div class="edit_file_symbol">
					<Edit />
				</div>
				<input type="file" on:change={update_image} bind:value />
			</div>
		</div>
	{/if}
</div>

<style>
	.outer {
		display: inline-block;
		position: relative;
		width: 100%;
		height: 100%;
		cursor: pointer;
	}
	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
	.overlay:hover {
		background-color: rgba(0, 0, 0, 0.5);
	}
	.edit_file_input {
		position: relative;
		background-color: var(--gray700);
		border-radius: 3px;
		width: 50px;
		height: 50px;
	}
	.edit_file_symbol {
		position: absolute;
		top: 0;
		left: 0;
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
