<script lang="ts">
	import Button from '$lib/components/elements/button.svelte';
	import InputField from '$lib/components/elements/input_field.svelte';
	import { is_loading } from '$lib/scripts/frontend/loading_store';
	import type { contact_form_type } from '$lib/scripts/universal/datatypes';
	import { Email } from 'carbon-icons-svelte';
	import { typed_keys } from 'functional-utilities';
	import { cloneDeep } from 'lodash-es';

	async function submit_form(contact_form: contact_form_type): Promise<Response> {
		if (contact_form.id === '') {
			delete contact_form.id;
		}
		if (contact_form.phone === '') {
			delete contact_form.phone;
		}
		return await fetch('/api/contacts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(contact_form)
		});
	}
	const default_form = {
		'Name*': {
			value: '',
			autocomplete: 'name'
		},
		'Email*': {
			value: '',
			autocomplete: 'email'
		},
		'Nachricht*': {
			value: '',
			autocomplete: 'text'
		},
		'Telefon Nummer': {
			value: '',
			autocomplete: 'tel'
		}
	};

	let contact_form: typeof default_form = cloneDeep(default_form);
</script>

<div class="form">
	<div class="top">
		<Email size={32} />
		<h2>Kontaktformular</h2>
	</div>
	<div class="items">
		{#each typed_keys(contact_form) as text}
			<InputField
				bind:value={contact_form[text].value}
				placeholder={`Hier ${text} eingeben...`}
				{text}
				autocomplete={contact_form[text].autocomplete}
				required={text !== 'Telefon Nummer'}
				text_field={text === 'Nachricht*'}
			/>
		{/each}
	</div>
	<Button
		text="Absenden"
		onclick={async () => {
			is_loading.set(true);
			await submit_form({
				email: contact_form['Email*'].value,
				name: contact_form['Name*'].value,
				message: contact_form['Nachricht*'].value,
				phone: contact_form['Telefon Nummer'].value
			});
			contact_form = cloneDeep(default_form);
			is_loading.set(false);
		}}
	/>
</div>

<style>
	.form {
		display: flex;
		width: 800px;
		max-width: 100%;
		padding: 30px;
		margin: 50px;
		background-color: var(--gray100);
		min-height: 700px;
		width: min(100%, 600px);
		box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.205);
		border-radius: 10px;
		margin-left: auto;
		margin-right: auto;
		flex-direction: column;
		align-items: center;
		gap: 40px;
	}
	.top {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.items {
		width: 100%;
	}
	h2 {
		margin-bottom: 0px;
	}
</style>
