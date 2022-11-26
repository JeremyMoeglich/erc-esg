<script lang="ts">
	import { fly } from 'svelte/transition';

	let active = false;

	export let disabled = false;
	export let direction: 'top' | 'bottom' = 'bottom';

	const transition_amount = 20;
</script>

<div
	on:mouseenter={() => {
		active = true;
	}}
	on:mouseleave={() => {
		active = false;
	}}
>
	{#if direction === 'bottom'}
		<slot name="wrapped" />
	{/if}
	<div class="dropdown_top">
		{#if active && !disabled}
			<div
				class="dropdown"
				class:top_direction={direction === 'top'}
				transition:fly|local={{
					y: direction === 'bottom' ? -transition_amount : transition_amount
				}}
			>
				<slot name="content" />
			</div>
		{/if}
	</div>
	{#if direction === 'top'}
		<slot name="wrapped" />
	{/if}
</div>

<style>
	.dropdown_top {
		position: relative;
		width: 100%;
		height: 0px;
	}
	.dropdown {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: fit-content;
		background-color: var(--gray000);
		padding: 10px;
	}
	.top_direction {
		transform: translateY(-100%);
	}
</style>
