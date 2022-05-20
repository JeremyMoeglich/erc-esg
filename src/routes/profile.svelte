<script lang="ts">
	import type { user_data_type } from '$lib/scripts/universal/datatypes';

	export let user_data: user_data_type;
</script>

<h1>Profil</h1>
<div class="outer">
	{#if user_data}
		<div>
			Name: {user_data.name}
		</div>
		<div>
			Email: {user_data.email}
		</div>
		<div>
			<div>
				Neues Passwort:
				<input type="password" name="new_password" />
			</div>
			<div>
				Passwort wiederholen:
				<input type="password" name="new_password_repeat" />
			</div>
		</div>
	{/if}
</div>
