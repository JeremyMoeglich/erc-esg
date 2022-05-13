<script lang="ts">
	import { page } from '$app/stores';
	import ItemBrowser from '$lib/components/site/item_browser/item_browser.svelte';
	import {
		category_datas_store,
		indexed_category_datas_store
	} from '$lib/scripts/frontend/data/category_data';
	import type { filter_type } from '$lib/scripts/universal/datatypes';
	import { get } from 'svelte/store';

	function update_filter(category: string) {
		const id = get(indexed_category_datas_store)?.[category]?.id;
		if (!id) {
			return;
		}
		filter = {
			category_id: id
		};
	}

	let category: string = get(page).params.category;
	$: category = $page.params.category;
	let filter: filter_type | undefined = undefined;
	$: update_filter(category);
	category_datas_store.subscribe(() => {
		update_filter(category);
	});
</script>

/category/index
<ItemBrowser {filter} />
