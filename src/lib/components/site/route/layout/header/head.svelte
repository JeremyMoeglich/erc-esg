<script lang="ts">
	import Account from './account.svelte';
	import Logo from './logo.svelte';
	import SearchBar from './search_bar.svelte';
</script>

<div class="main">
	<Logo />
	<SearchBar />
	<Account />
</div>

<style>
	.main {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 3vw;
		background: var(--gray100);
		box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.2);
	}
</style>
