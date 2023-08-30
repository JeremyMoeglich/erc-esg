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
	import { asks_store } from '$lib/scripts/frontend/data/asks';
	import Ask from './ask.svelte';
	import { get } from 'svelte/store';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });

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

	function ask_callback(resp: string) {
		const current_store = get(asks_store);
		const question = current_store.shift();
		if (!question) {
			return;
		}
		question.callback(resp);
		asks_store.set(current_store);
	}
</script>

<div class="outer" style:--scrollbar_width={`${scrollbarWidth() ?? 0}px`}>
	<Header />

	<div class="content">
		<slot />
	</div>

	<Footer />
	{#if $is_loading}
		<div class="full">
			<div class="spinner">
				<Circle2 />
			</div>
		</div>
	{/if}
	{#if $asks_store.length !== 0}
		<div class="full">
			<div>
				<Ask question={$asks_store[0]} done={ask_callback} />
			</div>
		</div>
	{/if}
</div>

<svelte:head>
	<title>ERC eSG</title>
</svelte:head>

<style>
	.full {
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
		display: flex;
		flex-direction: column;
		width: calc(100vw - var(--scrollbar_width));
		flex: auto;
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
