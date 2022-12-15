<script lang="ts">
	import Button from '$lib/components/elements/button.svelte';
	import type { Question } from '$lib/scripts/frontend/data/asks';

	export let question: Question<string>;
	export let done: (resp: string) => void;
</script>

<div class="outer">
	<h2 class="title">{question.title}</h2>
	<div class="button_outer">
		{#each question.answers as answer}
			<Button text={answer} onclick={() => done(answer)} />
		{/each}
	</div>
</div>

<style>
	.outer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background-color: var(--gray100);
		padding: 30px 60px;
	}
	.title {
		font-size: 1.5em;
		margin-bottom: 20px;
		margin-top: 0;
	}
	.button_outer {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}
</style>
