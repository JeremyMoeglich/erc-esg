<script>
	import Fields from '$lib/components/layout/fields/fields.svelte';
</script>

<Fields
	title={'Unsere Abteilungen'}
	fields={[
		{
			title: 'Beratung',
			id: 'beratung',
			text: `Die Mitarbeiter der Beratung kümmern sich um das operative Geschäft und werden dafür gezielt weitergebildet.`
		},
		{
			title: 'Kundenzufriedenheit',
			id: 'kundenzufriedenheit',
			text: `Die Mitarbeiter der Kundenzufriedenheit kümmern sich um die Optimierung der Prozesse um die Zufriedenhet der Kunden zu Steigern.`
		},
		{
			title: 'Marketing',
			id: 'marketing',
			text: `Die Marketingabteilung betreibt unsere Social Media Accounts und kümmert sich um die Kundenaquirirung. `
		},
		{
			title: 'Buchhaltung',
			id: 'buchhaltung',
			text: `Die Buchhaltung kümmert sich um die Finanzen der Schülerfirma und bereitet die Generalversammlung vor.`
		},
		{
			title: 'IT',
			id: 'it',
			text: 'Die Mitareiter der IT kümmer sich um die digitale Infrastruktur und unsere Website.'
		},
		{
			title: 'Wettbewerbe',
			id: 'wettbewerbe',
			text: 'Als Schülerfrima sind Wettbewerbe ein Stetiger Begleiter. Deshalb kümmert sich die Wettbewerbsabteilung um die Bewerbung und Abwicklung von Wettbewerben'
		}
	]}
/>
