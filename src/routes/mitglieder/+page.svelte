<script lang="ts">
	import Mitglied from './mitglied.svelte';

	interface Mitglied {
		vorname: string;
		nachname: string;
		alter: number;
		beitrittsdatum: Date;
		abteilung: string;
	}

	const mitglieder: Array<Mitglied> = [
		{
			nachname: 'Moeglich',
			vorname: 'Jeremy',
			beitrittsdatum: new Date("December 1, 2021"),
			abteilung: 'IT',
			alter: 18
		},
		{
			nachname: 'Moeglich',
			vorname: 'Jeremy',
			beitrittsdatum: new Date("December 1, 2021"),
			abteilung: 'IT',
			alter: 18
		},
		{
			nachname: 'Moeglich',
			vorname: 'Jeremy',
			beitrittsdatum: new Date("December 1, 2021"),
			abteilung: 'IT',
			alter: 18
		},
		{
			nachname: 'Moeglich',
			vorname: 'Jeremy',
			beitrittsdatum: new Date("December 1, 2021"),
			abteilung: 'IT',
			alter: 18
		},
	];
</script>

{#each mitglieder as mitglied}
	<Mitglied
		vorname={mitglied.vorname}
		abteilung={mitglied.abteilung}
		alter={mitglied.alter}
		beitrittsdatum={mitglied.beitrittsdatum}
		nachname={mitglied.nachname}
	/>
{/each}
