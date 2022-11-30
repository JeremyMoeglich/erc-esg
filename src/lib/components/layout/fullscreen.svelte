<script lang="ts">
	import { browser } from '$app/environment';
	import disableScroll from 'disable-scroll';
	import { onDestroy, onMount } from 'svelte';

	export let fullscreen: boolean;
	export let transition_time: number;

	let current_transition_time = transition_time;

	let placeholder_element: HTMLElement;
	let scroll_y: number;
	let scroll_x: number;
	let transition_state: 'small' | 'small_to_large' | 'large' | 'large_to_small' = fullscreen ? 'large' : 'small';

	let state: {
		width: string;
		height: string;
		top: string;
		left: string;
		z_index: number;
	} = {
		width: '100vw',
		height: '100vh',
		top: '0px',
		left: '0px',
		z_index: -1,
	};

	async function sleep(time: number) {
		return new Promise((resolve) => {
			setTimeout(resolve, time);
		});
	}
		


	async function set_placeholder_position() {
		if (!browser || !placeholder_element) {
			return;
		}
		const left = placeholder_element.offsetLeft;
		const top = placeholder_element.offsetTop;
		const rect = placeholder_element.getBoundingClientRect();
		const width = rect.width;
		const height = rect.height;
		state = {
			width: `${width}px`,
			height: `${height}px`,
			top: `${top}px`,
			left: `${left}px`,
			z_index: state.z_index,
		};
		await sleep(current_transition_time);
	}

	async function set_fullscreen_position() {
		// calculate absolute position to be fullscreen
		const parent = placeholder_element.offsetParent ?? document.body;
		const parent_rect = parent.getBoundingClientRect();
		state = {
			width: '100vw',
			height: '100vh',
			top: `${-parent_rect.top}px`,
			left: `${-parent_rect.left}px`,
			z_index: state.z_index,
		};
		await sleep(current_transition_time);
	}

	async function update(fullscreen: boolean) {
		if (fullscreen && transition_state === 'small') {
			current_transition_time = transition_time;
			disableScroll.on();
			state.z_index = 100;
			transition_state = 'small_to_large';
			await set_fullscreen_position();
			if (transition_state === 'small_to_large') {
				transition_state = 'large';
			}
		} else if (!fullscreen && (transition_state === 'large' || transition_state === 'small_to_large')) {
			current_transition_time = transition_time;
			disableScroll.off();
			state.z_index = 50;
			transition_state = 'large_to_small';
			await set_placeholder_position();
			if (transition_state === 'large_to_small') {
				transition_state = 'small';
				state.z_index = 1;
			}
		} else if (!fullscreen && transition_state === 'small') {
			current_transition_time = 0;
			state.z_index = 1;
			await set_placeholder_position(); // placeholder might have changed
		} else if (!fullscreen && transition_state === 'large_to_small') {
			set_placeholder_position();
		}
	}

	$: scroll_x, scroll_y, update(fullscreen);

	let interval: ReturnType<typeof setInterval>; 
	let resize_observer: ResizeObserver;
	
	onMount(() => {
		interval = setInterval(() => {
			update(fullscreen);
		}, 500);
		resize_observer = new ResizeObserver(() => {
			update(fullscreen);
		});
		resize_observer.observe(placeholder_element);
		resize_observer.observe(document.body);
	})

	onDestroy(() => {
		disableScroll.off();
		if (interval) {
			clearInterval(interval);
		}
		if (resize_observer) {
			resize_observer.disconnect();
		}
	});

	
</script>

<svelte:window bind:scrollY={scroll_y} bind:scrollX={scroll_x} />

<div
	class="placeholder"
	bind:this={placeholder_element}
>
	<slot />
</div>
<div
		class="fullscreen_element"
		style:transition-duration={`${current_transition_time}ms`}
		style:top={state.top}
		style:left={state.left}
		style:width={state.width}
		style:height={state.height}
		style:z-index={state.z_index}
	>
		<slot />
	</div>

<style>
	.placeholder {
		width: 100%;
		height: 100%;
		visibility: hidden;
	}
	.fullscreen_element {
		position: absolute;
		z-index: 100;
		background-color: white;
		transition: top 0.5s ease-in-out, left 0.5s ease-in-out, width 0.5s ease-in-out,
			height 0.5s ease-in-out;
	}
</style>
