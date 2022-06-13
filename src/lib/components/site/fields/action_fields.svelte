<script>
	import Fields from '$lib/components/layout/fields/fields.svelte';
</script>

<Fields
	title={'Unsere Leistungen'}
	fields={[
		{
			title: 'Gebäude Thermographie',
			image_id: 'gebaeude_thermographie',
			text: `Bei einer Gebäudethermographie schauen wir mittels einer Wärmebildkammera nach lecks in der Wärmedämmung von Häusern.`
		},
		{
			title: 'Leuchtmittel Analyse',
			image_id: 'leuchtmittel_analyse',
			text: `Bei einer Leuchtmittel Analyse schauen wir uns die verwendeten Leuchtmittel an und errchnen ggf. den eingesparten wert, bei einsatz von neuen Leuchtmitteln.`
		},
		{
			title: 'Analyse der Elektronischen Geräte',
			image_id: 'elektronische_geraete_analyse',
			text: `Bei der Analyse der Elektronischen Geräte untersuchen wir zum einen die Effiziens der Geräte, aber auch deren Platzierung.`
		},
		{
			title: 'Analyse des Nutzungsverhaltens',
			image_id: 'nutzungsverhalten_analyse',
			text: `Bei der Analyse des Nutzungsverhaltens schauen wir auf das individulle lüftungs, heitz und sonstige verhalten, im bezug auf die Energie effizientz.`
		}
	]}
/>
