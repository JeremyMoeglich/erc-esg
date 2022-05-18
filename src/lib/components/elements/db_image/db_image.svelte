<script lang="ts">
	import { admin_mode } from '$lib/scripts/frontend/auth/auth_state';
	import { Edit } from 'carbon-icons-svelte';
	import DbImageContent from './db_image_content.svelte';
	export let name: string;
	export let click: string | (() => void);
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
	{#if admin_mode}
		<div class="overlay">
			<div class="edit_symbol">
				<Edit />
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
	.edit_symbol {
		background-color: var(--gray700);
		border-radius: 3px;
		width: 50px;
		height: 50px;
	}
</style>
