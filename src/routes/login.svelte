<script lang="ts">
	import { goto } from '$app/navigation';

	import Button from '$lib/components/elements/button.svelte';
	import { current_auth_state } from '$lib/scripts/frontend/auth/auth_state';
	import { login } from '$lib/scripts/frontend/auth/login';
	import { register } from '$lib/scripts/frontend/auth/register';
	import { is_loading } from '$lib/scripts/frontend/loading_store';
	import { idify } from '$lib/scripts/universal/idify';
	import { UserAvatar } from 'carbon-icons-svelte';
	import { typed_entries } from 'functional-utilities';

	type page_mode = 'login' | 'register';

	let page_mode: page_mode = 'login';

	const field_keys = ['Passwort wiederholen', 'Passwort', 'Email', 'Name'] as const;

	type field_key = typeof field_keys[number];

	const field_values: Record<field_key, string> = {
		'Passwort wiederholen': '',
		Email: '',
		Passwort: '',
		Name: ''
	};

	const required_fields: Record<
		page_mode,
		Partial<Record<field_key, { type: 'password' | 'email' | 'text'; autocomplete: string }>>
	> = {
		login: {
			Email: {
				type: 'email',
				autocomplete: 'email'
			},
			Passwort: {
				type: 'password',
				autocomplete: 'current-password'
			}
		},
		register: {
			Email: {
				type: 'email',
				autocomplete: 'email'
			},
			Passwort: {
				type: 'password',
				autocomplete: 'new-password'
			},
			Name: {
				type: 'text',
				autocomplete: 'name'
			},
			'Passwort wiederholen': {
				type: 'password',
				autocomplete: 'new-password'
			}
		}
	};
	let error_message = '';
	async function run_page_mode() {
		if (
			page_mode === 'register' &&
			field_values['Passwort'] !== field_values['Passwort wiederholen']
		) {
			error_message = 'Passwörter stimmen nicht überein.';
			return;
		}
		try {
			is_loading.set(true);
			const response =
				page_mode === 'login'
					? await login(field_values.Email, field_values.Passwort)
					: await register(field_values.Name, field_values.Email, field_values.Passwort);

			if (response === undefined) {
				await goto('/');
			} else {
				error_message = response.message;
			}
		} finally {
			is_loading.set(false);
		}
	}

	$: $current_auth_state !== 'none' ? goto('/') : null;
</script>

<div class="outer">
	<div class="main">
		<div class="avatar">
			<UserAvatar size={32} />
		</div>
		<h3>
			{#if page_mode === 'login'}
				Anmelden
			{:else if page_mode === 'register'}
				Registrieren
			{/if}
		</h3>
		<div class="inputs" style:--distance={page_mode === 'login' ? '25px' : '0px'}>
			{#each typed_entries(required_fields[page_mode]) as required_field}
				{@const type = required_field[1].type}
				{@const text = required_field[0]}
				{@const name = idify(text)}
				{@const autocomplete = required_field[1].autocomplete}
				<div>
					<label for={name}>{text}</label>
					{#if type === 'password'}
						<input type="password" {name} {autocomplete} bind:value={field_values[text]} />
					{:else if type === 'email'}
						<input type="email" {name} {autocomplete} bind:value={field_values[text]} />
					{:else if type === 'text'}
						<input type="text" {name} {autocomplete} bind:value={field_values[text]} />
					{/if}
				</div>
			{/each}
			{#if error_message}
				<p>
					<mark>
						{error_message}
					</mark>
				</p>
			{/if}
			<div class="btn">
				<Button
					text={page_mode === 'login' ? 'Anmelden' : 'Registrieren'}
					important={true}
					onclick={run_page_mode}
				/>
			</div>
		</div>
		<p class="register">
			{page_mode === 'login' ? 'Noch keinen Account?' : 'Bereits ein Account?'}
			<Button
				text={page_mode === 'login' ? 'Registrieren' : 'Anmelden'}
				onclick={() => {
					if (page_mode === 'login') {
						page_mode = 'register';
					} else {
						page_mode = 'login';
					}
				}}
			/>
		</p>
	</div>
</div>

<style lang="scss">
	.outer {
		display: flex;
		justify-content: center;
	}
	.btn {
		align-items: center;
	}
	.inputs {
		display: flex;
		gap: var(--distance);
		width: 100%;
		flex-direction: column;
		align-items: center;
		& > div {
			display: flex;
			gap: 5px;
			width: 100%;
			padding: 10px 30px;
			flex-direction: column;
			& > label {
				font-weight: bold;
				color: var(--gray800);
			}
			& > input {
				border: 1px solid var(--gray800);
				border-radius: 3px;
				padding: 5px;
				font-size: large;
				color: var(--gray800);
				background-color: var(--gray100);
				width: 100%;
				&:focus {
					padding: 4px;
					outline: none;
					border: 2px solid var(--secondary-color);
					color: var(--secondary-color);
				}
			}
		}
	}
	.avatar {
		display: flex;
		width: 90%;
		justify-content: center;
		padding-bottom: 20px;
		border-bottom: 2px solid var(--gray500);
	}
	.register {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		width: 90%;
		border-top: 2px solid var(--gray500);
		padding-top: 20px;
		margin-top: 40px;
	}
	.main {
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 30px;
		margin: 50px;
		background-color: var(--gray100);
		min-height: 700px;
		width: min(100vw, 600px);
		box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.205);
		border-radius: 10px;
	}
</style>
