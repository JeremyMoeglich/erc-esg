<script lang="ts">
	import { browser } from '$app/environment';
	import DbImage from '$lib/components/elements/db_image/db_image.svelte';
	import { range } from 'functional-utilities';
	import { onMount } from 'svelte';

	const image_amount = 3;

	let Carousel: ConstructorOfATypedSvelteComponent;
	onMount(async () => {
		const module = await import('svelte-carousel');
		Carousel = module.default;
	});
</script>

<div class="main">
	<div class="left">
		<h1>Ecological Revolutionary Company</h1>
		<p>
			Wir sind ein junges und kreatives Team, welches sich für Nachhaltigkeit einsetzt. <br /> Damit
			wollen wir unseren Teil dazu beitragen, die Umwelt zu verbessern.
		</p>
	</div>
	<div class="right">
		{#if browser}
			<svelte:component this={Carousel} autoplay autoplayDuration={3000} autoplayProgressVisible>
				{#each range(image_amount) as i}
					<DbImage id={`showcase_image-${i}`} width={'100%'} attr={'w-1000,ar-3-2'} />
				{/each}
			</svelte:component>
		{/if}
	</div>
</div>

<style lang="scss">
	.main {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
		justify-content: space-evenly;
		width: 100%;
		height: 100%;
		padding: 30px 0px;
		gap: 60px;
	}
	.left {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 27px;
		width: 400px;
		max-width: 100%;
	}
	.right {
		width: 800px;
		max-width: 100%;
	}
	h1 {
		font-family: 'Roboto', sans-serif;
		font-size: 50px;
		font-weight: 500;
	}
</style>
