<script lang="ts">
	import type { simple_item_data_type } from '$lib/scripts/universal/datatypes';
	import { send, receive } from '$lib/scripts/frontend/crossfade';

	export let items: simple_item_data_type[];
</script>

<div>
	{#each items as item}
		{@const key = `image=${item.name}`}
		<a href={`/item${item.name}`}>
			<img out:send={{ key }} in:receive={{ key }} src={item.images[0]} alt={item.text} />
		</a>
	{/each}
</div>
