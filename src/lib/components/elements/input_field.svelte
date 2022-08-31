<script lang="ts">
	import { idify } from '$lib/scripts/universal/idify';

	export let type = 'text';
	export let value = '';
	export let required = false;
	export let text: string;
	export let placeholder = '';
	export let autocomplete: string;
	export let text_field = false;

	let input_element: HTMLInputElement | HTMLTextAreaElement;
</script>

<div>
	<label for={idify(text)}>{text}</label>
	{#key type}
		{#if text_field}
			<textarea
				id={idify(text)}
				bind:value
				{placeholder}
				{autocomplete}
				{required}
				name={idify(text)}
				title={placeholder}
			/>
		{:else}
			<input
				bind:this={input_element}
				{type}
				{value}
				{autocomplete}
				name={idify(text)}
				title={placeholder}
				{required}
				{placeholder}
				on:input={() => {
					value = input_element.value;
				}}
			/>
		{/if}
	{/key}
</div>

<style lang="scss">
	div {
		display: flex;
		gap: 5px;
		width: 100%;
		padding: 10px 30px;
		flex-direction: column;
	}
	label {
		font-weight: bold;
		color: var(--gray800);
	}
	textarea {
		resize: vertical;
	}
	input,
	textarea {
		border: 1px solid var(--gray800);
		border-radius: 3px;
		padding: 5px;
		font-size: large;
		color: var(--gray800);
		background-color: var(--gray100);
		width: 100%;
		&:focus {
			padding: 4px;
			outline: none;
			border: 2px solid var(--secondary-color);
			color: var(--secondary-color);
		}
	}
</style>
