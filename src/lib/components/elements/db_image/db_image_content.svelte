<script lang="ts">
	import { send, receive } from '$lib/scripts/frontend/crossfade';
	import { get_image_url } from '$lib/scripts/frontend/fetch/get_image_url';
	export let name: string;
	let image_url: string | undefined = undefined;
	$: key = `dbimage:${name}`;

	async function update_image_url(name: string) {
		const new_image_url = await get_image_url(name);
		if (new_image_url instanceof Error) {
			throw new_image_url;
		}
		image_url = new_image_url;
	}

	$: update_image_url(name);
</script>

{#if image_url}
	<img out:send={{ key }} in:receive={{ key }} src={image_url} alt={name} />
{/if}
