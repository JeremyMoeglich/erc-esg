<script lang="ts">
	import { Search } from 'carbon-icons-svelte';
	export let value = '';
	export let on_search: () => Promise<void>;

	function keypress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			on_search();
		}
	}
</script>

<div>
	<input type="search" bind:value on:keypress={keypress} />
	<button on:click={on_search}><Search fill={'var(--primary-color)'} size={32} /></button>
</div>

<style lang="scss">
	$size: 36px;
	div {
		display: flex;
		border: 1px solid var(--gray400);
		height: $size * 1.125;
		width: $size * 6.875;
		background-color: var(--gray000);
	}
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: $size * 1.125;
		border: 3px solid transparent;
		padding: 3px;
		background: none;
		cursor: pointer;
		&:hover {
			border: 3px solid var(--secondary-color);
		}
	}
	input {
		border: none;
		background: none;
		width: 100%;
		height: 100%;
		padding: 0px 10px;
		font-size: 14px;
		color: #333;
		outline: none;
		border-right: var(--gray400) solid 1px;
	}
</style>
