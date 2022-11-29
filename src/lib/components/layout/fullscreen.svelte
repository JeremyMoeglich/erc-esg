<script lang="ts">
	import { browser } from '$app/environment';

	export let fullscreen: boolean;
	export let transition_time: number;

	let current_transition_time = transition_time;
	let placeholder_element: HTMLElement;
	let scroll_y: number;
	let scroll_x: number;
	let transition_state: 'small' | 'small_to_large' | 'large' = fullscreen ? 'large' : 'small';

	let position: {
		width: string;
		height: string;
		top: string;
		left: string;
	} = {
		width: '0px',
		height: '0px',
		top: '100vw',
		left: '100vh'
	};

	function set_placeholder_position() {
		if (!browser || !placeholder_element) {
			return;
		}
		const left = placeholder_element.offsetLeft;
		const top = placeholder_element.offsetTop;
		const rect = placeholder_element.getBoundingClientRect();
		const width = rect.width;
		const height = rect.height;
		position = {
			width: `${width}px`,
			height: `${height}px`,
			top: `${top}px`,
			left: `${left}px`
		};
	}

	function set_fullscreen_position() {
		// calculate absolute position to be fullscreen
		const parent = placeholder_element.offsetParent ?? document.body;
		const parent_rect = parent.getBoundingClientRect();
		position = {
			width: '100vw',
			height: '100vh',
			top: `${-parent_rect.top}px`,
			left: `${-parent_rect.left}px`
		};
	}

	function update(fullscreen: boolean) {
		if (fullscreen && transition_state === 'small') {
			set_placeholder_position();
			transition_state = 'small_to_large';
			current_transition_time = transition_time;
			set_fullscreen_position();
		} else {
			set_placeholder_position();
			setTimeout(() => {
				show_fullscreen = false;
			}, transition_time);
		}
	}

	$: scroll_x, scroll_y, update(fullscreen);
</script>

<svelte:window bind:scrollY={scroll_y} bind:scrollX={scroll_x} />

<div
	class="placeholder"
	bind:this={placeholder_element}
	style:visible={fullscreen ? 'hidden' : 'visible'}
	on:resize={() => update(fullscreen)}
>
	<slot />
</div>
{#if show_fullscreen}
	<div
		class="fullscreen_element"
		style:transition-duration={`${current_transition_time}ms`}
		style:top={position.top}
		style:left={position.left}
		style:width={position.width}
		style:height={position.height}
	>
		{JSON.stringify(position)}
		<slot />
	</div>
{/if}

<style>
	.placeholder {
		width: 100%;
		height: 100%;
	}
	.fullscreen_element {
		position: absolute;
		z-index: 100;
		background-color: white;
		transition: top 0.5s ease-in-out, left 0.5s ease-in-out, width 0.5s ease-in-out,
			height 0.5s ease-in-out;
	}
</style>
