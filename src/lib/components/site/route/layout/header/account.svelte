<script lang="ts">
	import ItemDropdown from '$lib/components/layout/item_dropdown.svelte';
	import { current_auth_state, in_auth_action } from '$lib/scripts/frontend/auth/auth_state';
	import { logout } from '$lib/scripts/frontend/auth/logout';
	import { user_datas_store } from '$lib/scripts/frontend/data/user_data';
	import {
		ContentView,
		Dashboard,
		Logout,
		User,
		UserAvatar,
		Login,
		AddAlt
	} from 'carbon-icons-svelte';
	import { onDestroy } from 'svelte';
	import { get } from 'svelte/store';

	let auth_state = get(current_auth_state);
	let route = '/login';

	export let simple = false;

	const unsubscribe = current_auth_state.subscribe((new_auth_state) => {
		auth_state = new_auth_state;
		if (auth_state === 'none') {
			route = '/login';
		} else if (auth_state === 'user') {
			route = '/account';
		} else if (auth_state === 'admin') {
			route = '/admin';
		} else if (auth_state === 'root') {
			route = '/admin';
		}
	});

	onDestroy(unsubscribe);
</script>

<ItemDropdown disabled={simple}>
	<div slot="wrapped">
		<div class="outer">
			<a
				class="main"
				href={route}
				title={auth_state === 'none'
					? 'Anmelden'
					: auth_state === 'user'
					? 'Account einstellungen'
					: 'Admin Panel'}
			>
				{#if !$in_auth_action && !simple}
					<p class="side_text">
						{#if auth_state === 'none'}
							Anmelden / Registrieren
						{:else}
							{$user_datas_store?.name}
						{/if}
						{#if $user_datas_store?.tag}
							<br /><mark>[{$user_datas_store.tag}]</mark>
						{:else if auth_state === 'admin'}
							<br /><mark>[Admin]</mark>
						{:else if auth_state === 'root'}
							<br /><mark>[Root]</mark>
						{/if}
					</p>
				{/if}
				<div>
					<UserAvatar size={32} />
				</div>
			</a>
		</div>
	</div>
	<div class="dropdown" slot="content">
		{#if auth_state === 'none'}
			<a href="/login">Anmelden <Login /></a>
			<a href="/login?register">Registrieren <AddAlt /></a>
		{:else}
			<a href="/account">
				Account
				<User size={20} />
			</a>
			<button
				on:click={async () => {
					await logout();
				}}
			>
				<p>Abmelden</p>
				<Logout size={20} />
			</button>
		{/if}
		{#if auth_state === 'admin' || auth_state === 'root'}
			<a href="/admin">
				Admin
				<Dashboard size={20} />
			</a>
			<button
				on:click={() => {
					current_auth_state.set('user');
				}}
			>
				<p>Simulate User</p>
				<ContentView size={20} />
			</button>
		{/if}
	</div>
</ItemDropdown>

<style lang="scss">
	.side_text {
		font-size: large;
	}
	.main {
		display: flex;
		animation-duration: 400ms;
		align-items: center;
		gap: 10px;
		padding: 6px;
		&:hover {
			padding: 3px;
			border: 3px solid var(--secondary-color);
			color: var(--secondary-color);
		}
		color: var(--gray800);
		text-decoration: none;
		justify-content: center;
	}
	.outer {
		min-width: min(140px, 20%);
	}
</style>
