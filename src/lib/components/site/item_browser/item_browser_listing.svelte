<script lang="ts">
	import type { article_preview } from '$lib/scripts/universal/datatypes';
	import { send, receive } from '$lib/scripts/frontend/crossfade';

	export let items: article_preview[];
</script>

<div>
	{#each items as item}
		{@const key = `image=${item.name}`}
		<a href={`/item${item.name}`}>
			<img out:send={{ key }} in:receive={{ key }} src={item.images[0]} alt={item.text} />
		</a>
	{/each}
</div>
