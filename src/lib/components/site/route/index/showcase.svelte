<script lang="ts">
	import DbImage from '$lib/components/elements/db_image/db_image.svelte';
	import { in_delay, out_delay } from '$lib/scripts/frontend/data/delay';
	import { fly } from 'svelte/transition';
</script>

<div class="main" in:fly={{ x: 0, y: -50, ...$in_delay }} out:fly={{ x: 0, y: -50, ...$out_delay }}>
	<div class="left">
		<h1>Ecological Revolutionary Company</h1>
		<p>
			Wir sind ein junges, kreatives und lebensbewusstes Team. Wir sind umweltbewusst und wollen mit
			unserem Engagement für die Zukunft unserer Welt einen positiven Einfluss auf unsere Umwelt
			haben.
		</p>
	</div>
	<div class="right">
		<DbImage id={'showcase_image'} width={'100%'} />
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
		width: 500px;
		max-width: 100%;
	}
	.right {
		width: 1000px;
	}
	h1 {
		font-family: 'Roboto', sans-serif;
		font-size: 50px;
		font-weight: 500;
	}
</style>
