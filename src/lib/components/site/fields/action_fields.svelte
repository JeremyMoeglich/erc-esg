<script>
	import Fields from '$lib/components/layout/fields/fields.svelte';
	import Account from '../route/layout/footer/account.svelte';
</script>

<Fields
	title={'Unsere Leistungen'}
	fields={[
		{
			id: 'gebaeude_thermographie',
			preview:
				'Bei einer Gebäudethermographie schauen wir mittels einer Wärmebildkammera nach Lecks in der Wärmedämmung von Häusern.'
		},
		{
			id: 'leuchtmittel_analyse',
			preview:
				'Bei einer Leuchtmittel Analyse schauen wir uns die verwendeten Leuchtmittel an und errechnen ggf. den eingesparten Wert, bei Einsatz von neuen Leuchtmitteln.'
		},

		{
			id: 'elektronische_geraete_analyse',
			preview:
				'Bei der Analyse der elektronischen Geräten untersuchen wir zum einen die Effizienz der Geräte, zum anderen aber auch deren Platzierung.'
		},

		{
			id: 'nutzungsverhalten_analyse',
			preview:
				'Bei der Analyse des Nutzungsverhaltens schauen wir auf das individulle Lüftungs- oder Heizverhalten im Bezug auf die Energieeffizienz.'
		}
	]}
/>
