<script>
	import { fly } from 'svelte/transition';
</script>

<a href="/" title="Startseite">
	<img in:fly={{ duration: 1000, x: -10 }} src="/images/logo.svg" alt="" />
</a>

<style>
	a {
		width: 175px;
		max-width: 15vw;
	}
	img {
		width: 100%;
		aspect-ratio: 29/12;
	}
</style>
