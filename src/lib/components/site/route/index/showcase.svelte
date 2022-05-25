<script lang="ts">
	import { CaretSortDown } from 'carbon-icons-svelte';
	import { fly } from 'svelte/transition';

	let y: number;
</script>

<svelte:window bind:scrollY={y} />

<div class="outer">
	<div class="main">
		<div class="left" transition:fly={{ x: -50, y: -20, duration: 500 }}>
			<h1>Ecological Revolutionary Company</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate inventore corrupti ea
				architecto ex aliquam
			</p>
		</div>
		<img
			src="/images/solar.svg"
			alt="Haus mit Solar"
			transition:fly={{ x: 50, y: -20, duration: 500 }}
		/>
	</div>
</div>
<div class="more_space">
	{#if y === 0}
		<div class="more" transition:fly={{ y: 50, duration: 500 }}>
			<div>Mehr erfahren</div>
			<div>
				<CaretSortDown size={32} />
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	$text-margin: 120px;
	.outer {
		position: relative;
		width: 100vw;
		overflow: hidden;
		mask-image: linear-gradient(
			to bottom,
			black calc(100% - ($text-margin - 10px)),
			rgba(255, 255, 255, 0) 100%
		);
	}
	$box-width: 400px;
	$box-padding: 20px;
	$main-padding: 80px;
	.main {
		position: relative;
		display: flex;
		width: 120vw;
		padding: $main-padding;
	}

	.left {
		z-index: 2;
		color: rgb(0, 0, 0);
		margin-top: $text-margin;
		width: $box-width;
		max-width: 100vw;
		padding: $box-padding;
		& h1 {
			margin-top: 0px;
			font-size: max(3vw, 50px);
		}
		& p {
			font-size: max(1.5vw, 20px);
		}
	}
	@media (max-width: 1400px) {
		.left {
			background-color: rgba(255, 255, 255, 0.342);
			backdrop-filter: blur(6px);
			border-radius: 20px;
			border: 1px solid rgba(0, 0, 0, 0.349);
		}
	}
	@media (max-width: ($box-width + $box-padding * 2 + $main-padding * 2)) {
		.main {
			padding: 80px 0px;
		}
		.left {
			margin-left: max(calc(50vw - $box-width / 2), 0px);
		}
	}
	img {
		position: absolute;
		width: 100%;
		$m-width: 1200px;
		min-width: $m-width;
		right: min(-100px, calc(50vw - ($m-width / 2)));
		top: 50px;
	}
	.more {
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 30px;
		font-size: 30px;
	}
	.more_space {
		height: 134px;
	}
</style>
