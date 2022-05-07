<script>
	import { current_auth_state, in_auth_action } from '$lib/scripts/frontend/auth_state';
	import { UserAvatar } from 'carbon-icons-svelte';
	import { onDestroy } from 'svelte';
	import { get } from 'svelte/store';

	let auth_state = get(current_auth_state);
	let route = '/login';

	const unsubscribe = current_auth_state.subscribe((new_auth_state) => {
		auth_state = new_auth_state;
		if (auth_state === 'none') {
			route = '/login';
		} else if (auth_state === 'normal') {
			route = '/profile';
		} else if (auth_state === 'admin') {
			route = '/admin';
		} else if (auth_state === 'root') {
			route = '/admin';
		}
	});

	onDestroy(unsubscribe);
</script>

<a class="main" href={route}>
	{#if !$in_auth_action}
		<p class="side_text">
			{#if auth_state === 'none'}
				Anmelden
			{:else if auth_state === 'normal'}
				Profil
			{:else if auth_state === 'admin'}
				<mark>Admin</mark>
			{:else if auth_state === 'root'}
				<mark>Root</mark>
			{/if}
		</p>
	{/if}
	<div>
		<UserAvatar size={32} />
	</div>
</a>

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
		min-width: 140px;
	}
</style>
