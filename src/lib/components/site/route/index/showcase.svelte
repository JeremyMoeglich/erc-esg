<script lang="ts">
	import { in_delay, out_delay } from '$lib/scripts/frontend/data/delay';
	import { fly } from 'svelte/transition';
</script>

<div class="main">
	<div
		class="left"
		in:fly={{ x: -50, y: -20, ...$in_delay }}
		out:fly={{ x: -50, y: -20, ...$out_delay }}
	>
		<h1>Ecological Revolutionary Company</h1>
		<p>
			Wir sind ein junges, kreatives und lebensbewusstes Team. Wir sind umweltbewusst und wollen
			mit unserem Engagement für die Zukunft unserer Welt einen positiven Einfluss auf unsere
			Umwelt haben.
		</p>
	</div>
	<img
		class="right"
		src="/images/showcase.jpeg"
		alt="Erc-esg"
		in:fly={{ x: 50, y: -20, ...$in_delay }}
		out:fly={{ x: 50, y: -20, ...$out_delay }}
	/>
</div>

<style lang="scss">
	.main {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-evenly;
		width: 100%;
		height: 100%;
		gap: 60px;
		padding: 30px 60px;
	}
	.left {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 27px;
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
