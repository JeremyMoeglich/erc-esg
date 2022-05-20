<script lang="ts">
	import { page } from '$app/stores';

	import { typed_entries } from 'functional-utilities';
	import Account from './account.svelte';
	import Logo from './logo.svelte';

	const routes: Record<string, string> = {
		'/': 'Startseite',
		'/blog': 'Blog',
		'/about': 'Über uns',
		'/contact': 'Kontakt'
	};
</script>

<div class="main">
	<div class="upper">
		<div class="left_side">
			<Logo />
			{#each typed_entries(routes) as [route, name]}
				<a href={route} class:current_route={$page.url.pathname === route}>{name}</a>
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
	.main {
		background: white;
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
