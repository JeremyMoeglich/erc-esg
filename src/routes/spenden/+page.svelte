<script>
	import Fields from '$lib/components/layout/fields/fields.svelte';
</script>

<div>
	<Fields
		title={'Spenden'}
		fields={[
			{
				id: 'paypal',
				preview:
					'So können Sie Spenden via Paypal'
			},
			{
				id: 'spenden_konto',
				preview:
					'Unsere Kontoinformationen'
			},
			{
				id: 'bargeld',
				preview:
					'So können Sie Spenden via Bargeld'
			}
		]}
	/>
</div>

