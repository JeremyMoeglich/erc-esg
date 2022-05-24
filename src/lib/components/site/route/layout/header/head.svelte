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
	<div class="upper">
		<div class="left_side">
			<Logo />
			{#each typed_entries(routes) as [route, name], i}
				<a in:fly={{ duration: 500, y: -30, delay: i * 100 }} href={route} class:current_route={$page.url.pathname === route}>{name}</a>
			{/each}
		</div>
		<Account />
	</div>
</div>

<style>
	a {
		margin-top: 16px;
		font-size: 20px;
		text-decoration: none;
	}
	/* glass backround */
	.main {
		position: sticky;
		top: 0px;
		z-index: 2;

		background-color: rgba(255, 255, 255, 0.281);
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(8.7px);

		border-bottom: 7px solid var(--primary-color);
	}
	.left_side {
		display: flex;
		align-items: center;
		gap: 20px;
	}
	.current_route {
		text-decoration: underline;
	}
	.upper {
		padding: 10px 3vw;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
