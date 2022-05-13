<script lang="ts">
	import { page } from '$app/stores';
	import { indexed_category_datas_store } from '$lib/scripts/frontend/data/category_data';

	let subcategories = $indexed_category_datas_store?.[$page.params.category].subcategories;
</script>

<div class="sidebar">
	{#if subcategories}
		{#each subcategories as subcategory}
			<div>{subcategory.id}</div>
		{/each}
	{/if}
</div>

<slot />
