<script lang="ts">
	export let is_spam = false;
	let fields: {
		sp_accept: boolean;
		sp_email: string;
		sp_number: string;
	} = {
		sp_accept: false,
		sp_email: '',
		sp_number: ''
	};

	$: fields,
		() => {
			if (fields.sp_accept || fields.sp_email === '' || fields.sp_number === '') {
				is_spam = true;
			} else {
				is_spam = false;
			}
		};
</script>

<div style="display:none !important;">
	<input
		type="checkbox"
		name="sp_accept"
		tabindex="-1"
		autocomplete="off"
		bind:value={fields.sp_accept}
	/>
	<input type="email" name="sp_email" autocomplete="off" bind:value={fields.sp_email} />
	<input type="number" name="sp_number" autocomplete="off" bind:value={fields.sp_number} />
</div>