<script lang="ts">
	import LogoFacebook from 'carbon-icons-svelte/lib/LogoFacebook.svelte';
	import LogoInstagram from 'carbon-icons-svelte/lib/LogoInstagram.svelte';
	import LogoYoutube from 'carbon-icons-svelte/lib/LogoYoutube.svelte';
	import Account from './account.svelte';

	const logo_size = 24;
</script>

<div class="outer">
	<div class="left_content">
		<div>© 2022 ERC eSG</div>
		<a href="https://de-de.facebook.com/ERC.eSG/">
			<LogoFacebook size={logo_size} />
		</a>
		<a href="https://www.instagram.com/erc.esg/?hl=de">
			<LogoInstagram size={logo_size} />
		</a>
		<a href="https://www.youtube.com/@ecologicalrevolutionarycom3571">
			<LogoYoutube size={logo_size} />
		</a>
	</div>
	<a href="/impressum">Impressum</a>
	<a href="/datenschutz">Datenschutz</a>
	<div class="account">
		<Account />
	</div>
</div>

<style>
	.outer {
		display: flex;
		gap: 25px;
		align-items: center;
		padding: 15px;
		background-color: rgba(255, 255, 255, 0.281);
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(8.7px);
	}
	.left_content {
		display: flex;
		gap: 13px;
		align-items: center;
	}
	.account {
		margin-left: auto;
	}

	a:hover {
		color: var(--secondary-color);
		text-decoration: underline;
	}
</style>
