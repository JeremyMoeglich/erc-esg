<script lang="ts">
	import { page } from '$app/stores';
	import { get } from 'svelte/store';

	let article: string = get(page).params.article;
	$: article = $page.params.article;
</script>
