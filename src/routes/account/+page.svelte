<script lang="ts">
	import { user_datas_store } from '$lib/scripts/frontend/data/user_data';
	import type { safe_user_data_type } from '$lib/scripts/universal/datatypes';

	let user_data: safe_user_data_type | undefined;
	$: user_data = $user_datas_store;
</script>

<div class="outer">
	<h1>Account</h1>
	{#if user_data}
		<div class="items">
			<div class="field">
				<div>Name:</div>
				<div>
					{user_data.name}
				</div>
			</div>
			<div class="field">
				Email: {user_data.email}
			</div>
			<div class="password">
				<div class="field">
					Neues Passwort:
					<input type="password" name="new_password" />
				</div>
				<div class="field">
					Passwort wiederholen:
					<input type="password" name="new_password_repeat" />
				</div>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.outer {
		padding: 50px 70px;
		background-color: var(--gray300);
		width: fit-content;
	}
	h1 {
		margin-top: 0px;
	}
	.items {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		& > div {
			padding: 10px;
		}
	}
	.password {
		background-color: var(--gray200);
	}
	.field {
		width: 100%;
	}
</style>
