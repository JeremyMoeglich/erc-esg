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
		background: var(--gray100);
		box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.2);
	}
	.upper {
		padding: 10px 3vw;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
