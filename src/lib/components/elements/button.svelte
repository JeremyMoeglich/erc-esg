<script lang="ts">
	export let important = false;
	export let text: string;
	export let onclick: string | ((event: MouseEvent) => void | Promise<void>);
</script>

<div class:important class="main" on:click|stopPropagation>
	{#if typeof onclick === 'function'}
		<button on:click={onclick} class="btn">
			{text}
		</button>
	{:else}
		<a href={onclick} class="btn" sveltekit:prefetch>
			{text}
		</a>
	{/if}
</div>

<style lang="scss">
	.main {
		width: 128px;
		height: 48px;
		.btn {
			display: flex;
			justify-content: center;
			align-items: center;
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
		.btn {
			font-weight: bold;
			border: 2px solid var(--primary-color);
			box-shadow: 0px 2px 10px -3px var(--primary-color);
			&:hover {
				box-shadow: 0px 2px 10px 0px var(--primary-color);
			}
		}
	}
</style>
