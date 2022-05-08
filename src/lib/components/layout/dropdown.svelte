<script lang="ts">
	import { fly } from 'svelte/transition';
	let active = false;
</script>

<div
	on:mouseenter={() => {
		active = true;
	}}
	on:mouseleave={() => {
		active = false;
	}}
>
	<slot name="wrapped" />
	<div class="dropdown_top">
		{#if active}
			<div class="dropdown" transition:fly={{ y: 10 }}>
				<slot name="content" />
			</div>
		{/if}
	</div>
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
</style>
