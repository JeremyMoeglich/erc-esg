<script>
	import Fields from '$lib/components/layout/fields/fields.svelte';
</script>

<Fields
	title={'Unsere Abteilungen'}
	fields={[
		{
			id: 'beratung',
			preview:
				'Die Mitarbeiter der Beratung kümmern sich um das operative Geschäft und werden dafür gezielt weitergebildet.'
		},
		{
			id: 'kundenzufriedenheit',
			preview:
				'Die Mitarbeiter der Öffentlichkeitsarbeit kümmern sich darum, dass immer neue Artikel auf der Webseite erscheinen und nehmen an Wettbewerben teil um die Firma bekannter zu machen.'
		},
		{
			id: 'marketing',
			preview:
				'Die Marketingabteilung betreibt unsere Social Media Accounts und kümmert sich um die Kundenaquirirung. '
		},
		{
			id: 'buchhaltung',
			preview:
				'Die Buchhaltung kümmert sich um die Finanzen der Schülerfirma und bereitet die Generalversammlung vor.'
		},
		{
			id: 'it',
			preview:
				'Die Mitareiter der IT kümmert sich um die digitale Infrastruktur und unsere Website.'
		},
		{
			id: 'wettbewerbe',
			preview:
				'Die Wettbewerbsabteilung kümmer sich um die Bewerbung und Abwicklung von Wettbewerben'
		}
	]}
/>
