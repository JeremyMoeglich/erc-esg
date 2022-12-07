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
				'Die Mitarbeiter der Kundenzufriedenheit kümmern sich um die Optimierung der Prozesse um die Zufriedenhet der Kunden zu Steigern.'
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
				'Als Schülerfrima sind Wettbewerbe ein Stetiger Begleiter. Deshalb kümmert sich die Wettbewerbsabteilung um die Bewerbung und Abwicklung von Wettbewerben'
		}
	]}
/>
