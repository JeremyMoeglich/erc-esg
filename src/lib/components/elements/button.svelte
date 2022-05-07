<script lang="ts">
	export let important = false;
	export let text: string;
	export let onclick: () => void | string | Promise<void>;
</script>

<div class:important class="main">
	{#if typeof onclick === 'function'}
		<button on:click={onclick}>
			{text}
		</button>
	{:else}
		<a href={onclick}>
			{text}
		</a>
	{/if}
</div>

<style lang="scss">
	.main {
		width: 128px;
		height: 48px;
		& > button,
		a {
			font-size: large;
			width: 100%;
			height: 100%;
			transition-duration: 200ms;
			background-color: var(--gray200);
			border: 2px solid var(--secondary-color);
			box-shadow: 0px 2px 10px -5px var(--secondary-color);
			border-radius: 3px;
			&:hover {
				background-color: var(--gray000);
				box-shadow: 0px 2px 10px -1px var(--secondary-color);
				cursor: pointer;
			}
		}
	}
	.important {
		& > button,
		a {
			font-weight: bold;
			border: 2px solid var(--primary-color);
			box-shadow: 0px 2px 10px -3px var(--primary-color);
			&:hover {
				box-shadow: 0px 2px 10px 0px var(--primary-color);
			}
		}
	}
</style>
