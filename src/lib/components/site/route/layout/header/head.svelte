<script lang="ts">
	import Account from './account.svelte';
	import Logo from './logo.svelte';
</script>

<div class="main">
	<div class="upper">
		<div class="left_side">
			<Logo />
			<a href="/blog">Blog</a>
		</div>
		<Account />
	</div>
</div>

<style>
	.main {
		background: white;
		border-bottom: 7px solid var(--primary-color);
	}
	.left_side {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.upper {
		padding: 10px 3vw;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
