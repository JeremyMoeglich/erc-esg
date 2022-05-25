<script lang="ts">
	import { page } from '$app/stores';

	import { typed_entries } from 'functional-utilities';
	import { fly } from 'svelte/transition';
	import Account from './account.svelte';
	import Logo from './logo.svelte';

	const routes: Record<string, string> = {
		'/': 'Startseite',
		'/blog': 'Blog',
		'/about': 'Über uns',
		'/contact': 'Kontakt'
	};
</script>

<div class="main" in:fly={{ duration: 1000, y: -30 }}>
	<div>
		<Logo />
	</div>
	{#each typed_entries(routes) as [route, name], i}
		<a
			class="desktop"
			in:fly={{ duration: 500, y: -30, delay: i * 100 }}
			href={route}
			class:current_route={$page.url.pathname === route}>{name}</a
		>
	{/each}
	<div class="desktop account">
		<Account />
	</div>
</div>

<style>
	a {
		font-size: 20px;
		text-decoration: none;
	}
	/* glass backround */
	.main {
		position: sticky;
		display: flex;
		gap: 20px;
		align-items: center;
		justify-content: flex-start;
		padding: 10px 3vw;
		padding-bottom: 7px;

		top: 0px;
		z-index: 2;
		min-height: 70px;

		background-color: rgba(255, 255, 255, 0.281);
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(8.7px);

		border-bottom: 7px solid var(--primary-color);
	}
	.account {
		margin-left: auto;
	}
	.current_route {
		text-decoration: underline;
	}
	@media (max-width: 830px) {
		.desktop {
			display: none;
		}
	}
</style>
