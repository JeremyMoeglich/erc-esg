<script lang="ts">
	import { send, receive } from '$lib/scripts/frontend/crossfade';
	export let name: string;
	$: key = `dbimage:${name}`;

    
</script>

<img out:send={{ key }} in:receive={{ key }} src={article.image_url} alt={article.title} />
