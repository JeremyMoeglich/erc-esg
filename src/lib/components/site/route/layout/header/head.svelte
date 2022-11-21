<script lang="ts">
	import { page } from '$app/stores';
	import { typed_entries } from 'functional-utilities';
	import { fly } from 'svelte/transition';
	import Account from './account.svelte';
	import Logo from '../logo.svelte';
	import { Hamburger } from 'svelte-hamburgers';
	import { logged_in } from '$lib/scripts/frontend/auth/auth_state';
	import { logout } from '$lib/scripts/frontend/auth/logout';

	const routes: Record<string, string> = {
		'/': 'Startseite',
		'/blog': 'Blog',
		'/about': 'Über uns',
		'/leistungen': 'Leistungen',
		'/contact': 'Kontakt',
	};

	let navigation_open = false;

	page.subscribe(() => {
		navigation_open = false;
	});
</script>

<div class="main" in:fly|local={{ duration: 1000, y: -30 }} class:opened={navigation_open}>
	<div class="logo_navigator">
		<div class="logo">
			<Logo />
		</div>
		<div class="mobile account">
			<Account simple={true} />
		</div>
		<div class="navigator mobile">
			<Hamburger bind:open={navigation_open} />
		</div>
	</div>
	{#each typed_entries(routes) as [route, name], i}
		<a
			class:desktop={!navigation_open}
			data-sveltekit-prefetch
			in:fly={{ duration: 500, y: -30, delay: i * 100 }}
			href={route}
			class:current_route={$page.url.pathname === route}>{name}</a
		>
	{/each}
	{#if $logged_in}
		<button
			in:fly={{ duration: 500, y: -30, delay: Object.keys(routes).length * 100 }}
			class:mobile={true}
			class:hidden={!navigation_open}
			on:click={logout}
		>
			Abmelden
		</button>
	{/if}
	<div class="desktop account">
		<Account />
	</div>
</div>

<style lang="scss">
	a,
	button {
		font-size: 20px;
		text-decoration: none;
		padding: 10px;
		&:hover {
			border: 1px solid #000;
			padding: 9px;
		}
	}
	button {
		color: red;
	}
	.main {
		display: flex;
		gap: 20px;
		align-items: center;
		justify-content: flex-start;
		padding: 10px 3vw;
		padding-bottom: 7px;
		transition-duration: 200ms;

		top: 0px;
		z-index: 2;
		min-height: 70px;

		background-color: rgba(255, 255, 255, 0.281);
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(8.7px);

		border-bottom: 7px solid var(--primary-color);
	}
	.account,
	.navigator {
		margin-left: auto;
	}
	.current_route {
		text-decoration: underline;
	}
	.mobile {
		display: none;
	}
	.hidden {
		display: none !important;
	}
	@media (max-width: 830px) {
		.desktop {
			display: none;
		}
		.mobile {
			display: block;
		}
		.account,
		.navigator {
			margin-left: 0px;
		}
		.main {
			flex-direction: column;
			gap: 10px;
		}
		.logo_navigator {
			width: 100%;
		}
		.opened {
			padding-bottom: 40px;
		}
	}
	.logo_navigator {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.logo {
		min-width: 20%;
	}
</style>
