<script lang="ts">
	import { page } from '$app/stores';

	let category: string;
	let subcategory: string;

	$: category = $page.params.category;
    $: subcategory = $page.params.subcategory;
</script>


subcategory index