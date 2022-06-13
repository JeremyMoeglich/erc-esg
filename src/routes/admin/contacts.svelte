<script lang="ts">
	import { get_contacts } from '$lib/scripts/frontend/fetch/get_contacts';
	import type { ContactForm } from '@prisma/client';

	let contact_forms: ContactForm[] = [];

	(async () => {
		contact_forms = await get_contacts();
	})();
</script>

<div class="forms">
	{#each contact_forms as contact_form}
		<div class="contact_form">
			<div class="data">
				<h3>Informationen</h3>
				<p>{new Date(contact_form.createdAt).toLocaleString('de-DE')}</p>
				<p>Name: {contact_form.name}</p>
				<p>Email: {contact_form.email}</p>
				{#if contact_form.phone} <p>Phone: {contact_form.phone}</p>{/if}
			</div>
			<div class="message">
				<h3>Nachricht:</h3>
				<p>{contact_form.message}</p>
			</div>
		</div>
	{/each}
</div>

<style>
	.forms {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.contact_form {
		display: flex;
		gap: 20px;
		background-color: var(--gray000);
		padding: 20px;
	}
	.data {
		flex: 1;
	}
	.message {
		flex: 2;
	}
</style>
