<script lang="ts">
	import '../global.scss';
	import Header from '$lib/components/site/route/layout/header/head.svelte';
	import { page } from '$app/stores';
	import { in_auth_action } from '$lib/scripts/frontend/auth/auth_state';
	import { check_token_and_login } from '$lib/scripts/frontend/auth/token_login';
	import { is_loading } from '$lib/scripts/frontend/loading_store';
	import { Circle2 } from 'svelte-loading-spinners';
	import PageTransition from '$lib/components/layout/page_transition.svelte';
	import { onMount } from 'svelte';

	const auth_pages = ['/login', '/register', '/profile'];

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

	let ready = false;
	onMount(() => (ready = true));
</script>

<div class="outer">
	{#if ready}
		<Header />
	{/if}
	<div class="content">
		<PageTransition>
			<slot />
		</PageTransition>
	</div>
	{#if $is_loading}
		<div class="loading">
			<div class="spinner">
				<Circle2 />
			</div>
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
	.content {
		z-index: -4;
	}
</style>
