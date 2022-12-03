<script lang="ts">
	export let transition_time: number;

	type Positions = 'left' | 'center';

	export let position: Positions;
	export let shrink_to: string | undefined = undefined;

	type States = Positions | 'left_center' | 'center_left';

	let state: States = position;
	export let shrunk: boolean = state === 'left';

	function update_state() {
		if (state === position) {
			if (state === 'left') {
				shrunk = true;
			} else {
				shrunk = false;
			}
			return;
		}

		if (state === 'left' && position === 'center') {
			state = 'left_center';
			shrunk = false;
			setTimeout(() => {
				if (state === 'left_center') {
					state = 'center';
				}
			}, transition_time);
		} else if (state === 'center' && position === 'left') {
			state = 'center_left';
			setTimeout(() => {
				if (state === 'center_left') {
					state = 'left';
					shrunk = true;
				}
			}, transition_time);
		}
	}

	$: state, position, update_state();
</script>

<div
	class="outer_position_alignment"
	style:width={shrunk && shrink_to ? shrink_to : '100%'}
	style:transition-duration={`${transition_time}ms`}
>
	<div
		class="position_alignment"
		style:width={position === 'left' ? '0px' : '100%'}
		style:transition-duration={`${transition_time}ms`}
	>
		<div
			class="element"
			style:transition-duration={`${transition_time}ms`}
			style:transform={position === 'left' ? 'translateX(50%)' : 'translateX(0px)'}
		>
			<slot />
		</div>
	</div>
</div>

<style>
	.outer_position_alignment {
		transition-property: width;
	}
	.position_alignment {
		display: flex;
		justify-content: center;
		transition-property: width;
	}
	.element {
		transition-property: transform;
	}
</style>
