<script>
	import { fly } from 'svelte/transition';
</script>

<a href="/"><img in:fly={{ duration: 1000, x: -10 }} src="/images/logo.svg" alt="" /></a>

<style>
	a {
		width: 175px;
		max-width: 15vw;
	}
</style>
