<script lang="ts">
	import { user_datas_store } from '$lib/scripts/frontend/data/user_data';

	import { get_admins } from '$lib/scripts/frontend/fetch/get_admins';

	import type { user_data_type } from '$lib/scripts/universal/datatypes';
	import { Locked, User } from 'carbon-icons-svelte';

	let admins: user_data_type<'admin'>[] | undefined = undefined;

	(async () => {
		admins = await get_admins();
	})();

	function is_locked(user_data: user_data_type<'admin'>): boolean {
		return user_data.id === 'cl3lwm64k000473wpz1alp5di' || user_data.id === $user_datas_store?.id;
	}
</script>

<div>
	<h2>List of Admins</h2>
	{#if admins}
		<div>
			{#each admins as admin}
				<div class="user">
					<p>
						<User />
						{admin.name}
						{#if admin.tag} - ({admin.tag}){/if}
					</p>
					{#if is_locked(admin)}
						<div class="locked">Locked <Locked /></div>
                    {:else}
                        <button>Admin Entfernen</button>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.user {
		display: flex;
		align-items: center;
		gap: 20px;
		background-color: var(--gray000);
		padding: 10px;
		border-radius: 5px;
		margin: 10px;
		border: 2px solid var(--secondary-color);
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
		& > p {
			padding: 10px;
		}
	}
    button {
        background-color: var(--gray300);
        border: 2px solid var(--secondary-color);
        border-radius: 5px;
        padding: 10px;
        color: var(--secondary-color);
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
        transition-duration: 300ms;
        &:hover {
            background-color: white;
            color: var(--primary-color);
            box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
            transform: scale(1.02);
        }
    }
</style>
