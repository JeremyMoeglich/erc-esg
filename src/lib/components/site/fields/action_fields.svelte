<script>
	import Fields from '$lib/components/layout/fields/fields.svelte';
</script>

<Fields
	title={'Unsere Leistungen'}
	fields={[
		{
			title: 'Gebäude Thermographie',
			image_id: 'gebaeude_thermographie',
			text: `Bei einer Gebäudethermographie schauen wir mittels einer Wärmebildkammera nach Lecks in der Wärmedämmung von Häusern.`
		},
		{
			title: 'Leuchtmittel Analyse',
			image_id: 'leuchtmittel_analyse',
			text: `Bei einer Leuchtmittel Analyse schauen wir uns die verwendeten Leuchtmittel an und errechnen ggf. den eingesparten Wert, bei Einsatz von neuen Leuchtmitteln.`
		},
		{
			title: 'Analyse der elektronischen Geräte',
			image_id: 'elektronische_geraete_analyse',
			text: `Bei der Analyse der elektronischen Geräten untersuchen wir zum einen die Effizienz der Geräte, zum anderen aber auch deren Platzierung.`
		},
		{
			title: 'Analyse des Nutzungsverhaltens',
			image_id: 'nutzungsverhalten_analyse',
			text: `Bei der Analyse des Nutzungsverhaltens schauen wir auf das individulle Lüftungs- oder Heizverhalten im Bezug auf die Energieeffizienz.`
		}
	]}
/>
