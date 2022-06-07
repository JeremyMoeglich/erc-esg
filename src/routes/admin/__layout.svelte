<script>
	import { admin_mode, logged_in } from '$lib/scripts/frontend/auth/auth_state';
	import { DataBase, Home, User } from 'carbon-icons-svelte';

	const size = 32;
</script>

{#if $admin_mode}
	<div class="outer">
		<div class="sidebar_tabs">
			<a href="/admin/index">
				<Home {size} />
			</a>
			<a href="/admin/users">
				<User {size} />
			</a>
			<a href="/admin/contacts">
				<DataBase {size} />
			</a>
		</div>
		<div class="content">
			<h1>Admin Panel</h1>
			<slot />
		</div>
	</div>
{:else if $logged_in}
	<h2>Sie haben keinen Zugriff auf diese Seite</h2>
{:else}
	<h2>Sie sind nicht angemeldet</h2>
{/if}

<style lang="scss">
	.outer {
		display: flex;
		gap: 20px;
		width: 100%;
		padding: 10px;
	}
	.sidebar_tabs {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		padding: 10px;
		background-color: var(--gray100);
		border-radius: 10px;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
		& > * {
			padding: 15px;
			background-color: var(--gray200);
			box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
			border-radius: 5px;
			cursor: pointer;
			transition-duration: 200ms;
			&:hover {
				color: var(--primary-color);
				background-color: var(--secondary-color);
				box-shadow: 0px 0px 00px rgba(0, 0, 0, 0.4);
				transform: scale(1.05);
			}
		}
	}
</style>
