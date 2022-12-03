<script lang="ts">
	import { page } from '$app/stores';
	import { typed_entries } from 'functional-utilities';

	import Logo from '../logo.svelte';
	import { Hamburger } from 'svelte-hamburgers';
	import { logged_in } from '$lib/scripts/frontend/auth/auth_state';
	import { logout } from '$lib/scripts/frontend/auth/logout';

	const routes: Record<string, string> = {
		'/': 'Startseite',
		'/blog': 'Aktuelles',
		'/about': 'Über uns',
		'/leistungen': 'Leistungen',
		'/contact': 'Kontakt',
		'/gallery': "Galerie"
	};

	let navigation_open = false;

	page.subscribe(() => {
		navigation_open = false;
	});
</script>

<div class="main" class:opened={navigation_open}>
	<div class="logo_navigator">
		<div class="logo">
			<Logo />
		</div>
		<div class="navigator mobile">
			<Hamburger bind:open={navigation_open} />
		</div>
	</div>
	{#each typed_entries(routes) as [route, name]}
		<a
			class:desktop={!navigation_open}
			href={route}
			class:current_route={$page.url.pathname === route}>{name}</a
		>
	{/each}
	{#if $logged_in}
		<button class:mobile={true} class:hidden={!navigation_open} on:click={logout}>
			Abmelden
		</button>
	{/if}
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

		background-color: rgb(141, 170, 179);
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(8.7px);

		border-bottom: 7px solid var(--primary-color);
	}
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
