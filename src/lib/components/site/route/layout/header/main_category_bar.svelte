<script lang="ts">
	import ItemDropdown from '$lib/components/layout/item_dropdown.svelte';
	import { admin_mode } from '$lib/scripts/frontend/auth/auth_state';
	import { category_datas_store } from '$lib/scripts/frontend/data/category_data';
	import { create_category } from '$lib/scripts/frontend/fetch/create_category';
	import { delete_category } from '$lib/scripts/frontend/fetch/delete_category';
	import { AddAlt, TrashCan } from 'carbon-icons-svelte';

	let new_category_text = 'Neue Kategorie';
</script>

{#if $category_datas_store !== undefined}
	<div class="category_bar">
		{#each $category_datas_store instanceof Array ? $category_datas_store : [] as category_data}
			<ItemDropdown>
				<div slot="wrapped" class="wrapped">
					<a href={`/category/${category_data.name}`}>{category_data.text}</a>
				</div>
				<div slot="content">
					{#if $admin_mode}
						<button
							on:click={async () => {
								await delete_category(category_data.name);
							}}
						>
							Kategorie Löschen <TrashCan size={20} />
						</button>
						<button
							on:click={async () => {
								await delete_category(category_data.name);
							}}
						>
							Kategorie Löschen <TrashCan size={20} />
						</button>
					{/if}
					{#each category_data.subcategories as subcategory}
						<a href={`/subcategory/${subcategory.name}`}>{subcategory.text}</a>
					{/each}
				</div>
			</ItemDropdown>
		{/each}
		{#if $admin_mode}
			<div class="new_category">
				<input type="text" bind:value={new_category_text} />
				<button
					on:click={async () => {
						await create_category(new_category_text);
					}}
				>
					<AddAlt size={20} />
				</button>
			</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	.category_bar {
		display: flex;
		align-items: center;
		padding-top: 40px;
		padding-bottom: 30px;
	}
	.new_category {
		display: flex;
	}
	.wrapped > a,
	.new_category > button {
		display: flex;
		height: 43px;
		padding: 8px;
		align-items: center;
		justify-content: center;
		background-color: var(--secondary-hint);
		background-image: linear-gradient(to bottom, var(--gray300), var(--gray400));
		border: 2px solid transparent;
		color: var(--secondary-dark);
		font-size: 15px;
		&:hover {
			border: 2px solid var(--secondary-color);
			cursor: pointer;
			color: var(--secondary-color);
		}
	}
	.wrapped > a {
		min-width: 130px;
	}
</style>
