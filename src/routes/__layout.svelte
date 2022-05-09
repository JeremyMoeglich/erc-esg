<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const response = await fetch(`/api/get_categories_of_main.json`);

		return {
			status: response.status,
			props: {
				category_datas: (await response.json()).category_datas
			}
		};
	};
</script>

<script lang="ts">
	import '../global.scss';
	import Header from '$lib/components/site/route/layout/header/head.svelte';
	import { page } from '$app/stores';
	import { in_auth_action } from '$lib/scripts/frontend/auth/auth_state';
	import { check_token_and_login } from '$lib/scripts/frontend/auth/token_login';
	import { is_loading } from '$lib/scripts/frontend/loading_store';
	import { Circle2 } from 'svelte-loading-spinners';
	import type { category_data_type } from '$lib/scripts/universal/datatypes';
	import { category_datas_store } from '$lib/scripts/frontend/data/category_data';

	const auth_pages = ['/login', '/register', '/profile'];
	export let category_datas: category_data_type[];

	$: category_datas_store.set(category_datas);
	export let error = '';

	page.subscribe((current_page) => {
		if (auth_pages.includes(current_page.url.pathname)) {
			in_auth_action.set(true);
		} else {
			in_auth_action.set(false);
		}
	});

	(async () => {
		await check_token_and_login();
	})();
</script>

<div class="outer">
	<Header />
	<slot />
	{#if $is_loading}
		<div class="loading">
			<div class="spinner">
				<Circle2 />
			</div>
		</div>
	{/if}
	{#if error}
		<div class="error">
			<p>{error}</p>
		</div>
	{/if}
</div>

<style>
	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0px;
		left: 0px;
		z-index: 9999;
		background-color: rgba(128, 128, 128, 0.308);
	}
</style>
