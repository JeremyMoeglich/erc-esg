<script lang="ts">
	export let content: string;
	export let editable: boolean;

	let loading_edit: boolean = false;

	let lazyEditor: typeof import('./editor.svelte');

	function load_editor() {
		loading_edit = true;
		lazyEditor = import('./editor.svelte') as unknown as typeof import('./editor.svelte'); // TODO: fix this
	}

	$: editable && !lazyEditor && !loading_edit && load_editor();
</script>

<div class="editor_outer">
	{#if lazyEditor && editable}
		{#await lazyEditor then { default: LazyComponent }}
			<LazyComponent bind:content />
		{/await}
	{:else}
		{@html content}
	{/if}
</div>

<style>
	.editor_outer {
		width: 100%;
		height: 100%;
	}
</style>
