<script>
	import Dropdown from './dropdown.svelte';
</script>

<Dropdown>
	<div slot="wrapped">
		<slot name="wrapped" />
	</div>
	<div slot="content" class="dropdown">
		<slot name="content" />
	</div>
</Dropdown>

<style>
	:global([slot='content']) {
		display: flex;
		flex-direction: column;
	}
	:global([slot='content'] > a, button) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		background-color: transparent;
		border: none;
		font-size: 17px;
		text-align: left;
		color: var(--gray800);
		padding: 6px;
		text-decoration: none;
		border: 2px solid transparent;
	}
	:global([slot='content'] > a:hover, button:hover) {
		border: 2px solid var(--secondary-color);
		cursor: pointer;
	}
</style>
