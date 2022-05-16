<script lang="ts">
	import Account from './account.svelte';
	import Logo from './logo.svelte';
</script>

<div class="main">
	<div class="upper">
		<Logo />
		<Account />
	</div>
</div>

<style>
	.main {
		background: white;
		border-bottom: 7px solid var(--primary-color);
	}
	.upper {
		padding: 10px 3vw;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
