<script lang="ts">
	import '../global.scss';
	import Header from '$lib/components/site/route/layout/header/head.svelte';
	import { page } from '$app/stores';
	import { in_auth_action } from '$lib/scripts/frontend/auth/auth_state';
	import { check_token_and_login } from '$lib/scripts/frontend/auth/token_login';
	import { is_loading } from '$lib/scripts/frontend/loading_store';
	import { Circle2 } from 'svelte-loading-spinners';
	import Footer from '$lib/components/site/route/layout/footer/foot.svelte';
	import { scrollbarWidth } from '@xobotyi/scrollbar-width';

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
</script>

<div class="outer" style:--scrollbar_width={`${scrollbarWidth() ?? 0}px`}>
	<Header />

	<div class="content">
		<slot />
	</div>

	<Footer />
	{#if $is_loading}
		<div class="loading">
			<div class="spinner">
				<Circle2 />
			</div>
		</div>
	{/if}
</div>

<svelte:head>
	<title>ERC eSG</title>
</svelte:head>

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
		width: calc(100vw - var(--scrollbar_width));
	}
	.outer {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		width: 100vw;
		position: relative;
		padding-right: var(--scrollbar_width);
	}

</style>
