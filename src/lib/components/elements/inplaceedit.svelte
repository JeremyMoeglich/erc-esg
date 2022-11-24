<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let value: string;
	export let required = true;

	const dispatch = createEventDispatcher<{ submit: string }>();
	let editing = false;
	let original: string;

	onMount(() => {
		original = value;
	});

	function edit() {
		editing = true;
	}

	function submit() {
		if (value !== original) {
			dispatch('submit', value);
		}

		editing = false;
	}

	function keydown(event: KeyboardEvent) {
		if (event.key == 'Escape') {
			event.preventDefault();
			value = original;
			editing = false;
		}
	}

	function focus(element: HTMLElement) {
		element.focus();
	}
</script>

{#if editing}
	<form on:submit|preventDefault={submit} on:keydown={keydown}>
		<input bind:value on:blur={submit} {required} use:focus />
	</form>
{:else}
	<div on:click={edit} on:keypress={edit}>
		{value}
	</div>
{/if}

<style>
	input {
		border: none;
		background: none;
		font-size: inherit;
		color: inherit;
		font-weight: inherit;
		text-align: inherit;
		box-shadow: none;
	}
</style>
