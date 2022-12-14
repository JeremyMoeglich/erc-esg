<script lang="ts">
	import { unknown } from 'zod';
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
			vorname: 'Leonhard',
			nachname: 'Spielhoff',
			beitrittsdatum: new Date('May 30, 2022'),
			abteilung: 'Vorstand',
			alter: 15
		},
		{
			vorname: 'Yannik',
			nachname: 'Pakkai',
			beitrittsdatum: new Date('January 19, 2022'),
			abteilung: 'Vorstand',
			alter: 19
		},
		{
			vorname: 'David',
			nachname: 'Hesseler',
			beitrittsdatum: new Date('May 30, 2022'),
			abteilung: 'Beratung / Buchhaltung',
			alter: 15
		},
		{
			vorname: 'Cedric',
			nachname: 'Haasz',
			beitrittsdatum: new Date('June 1, 2022'),
			abteilung: 'Beratung',
			alter: 18
		},
		{
			vorname: 'Emanuel',
			nachname: 'Kutz',
			beitrittsdatum: new Date('January 1, 2022'),
			abteilung: 'Beratung / Social Media',
			alter: 18
		},
		{
			vorname: 'Jeremy',
			nachname: 'Möglich',
			beitrittsdatum: new Date('January 1, 2022'),
			abteilung: 'IT',
			alter: 18
		},
		{
			vorname: 'Noah',
			nachname: 'Jonas',
			beitrittsdatum: new Date('June 1, 2022'),
			abteilung: 'IT',
			alter: 15
		},
		{
			vorname: 'Benedikt',
			nachname: 'Kemper',
			beitrittsdatum: new Date('June 1, 2022'),
			abteilung: 'Öffentlichkeit',
			alter: 15
		},
		{
			vorname: 'Hanfei',
			nachname: 'Yu',
			beitrittsdatum: new Date('January 19, 2022'),
			abteilung: 'Öffentlichkeit',
			alter: 18
		},
		{
			vorname: 'Yurong',
			nachname: 'Li',
			beitrittsdatum: new Date('January 19, 2022'),
			abteilung: 'Öffentlichkeit',
			alter: 18
		},
		{
			vorname: 'Junes',
			nachname: 'Wruck',
			beitrittsdatum: new Date('January 19, 2022'),
			abteilung: 'Fahrer',
			alter: 18
		},
		{
			vorname: 'Maiko',
			nachname: 'Nüsken',
			beitrittsdatum: new Date('January 16, 2022'),
			abteilung: 'Buchhaltung',
			alter: 17
		},

		{
			vorname: 'Julius',
			nachname: 'Thormann',
			beitrittsdatum: new Date('January 1, 2022'),
			abteilung: 'Buchhaltung',
			alter: 15
		},
		{
			vorname: 'Oliver',
			nachname: 'Menzel',
			beitrittsdatum: new Date('June 1, 2022'),
			abteilung: 'Protokollant',
			alter: 17
		},
		{
			vorname: 'Antonia',
			nachname: 'Richter',
			beitrittsdatum: new Date('june 1, 2022'),
			abteilung: 'Protokollantin / Marketing',
			alter: 15
		},
		{
			vorname: 'Harald',
			nachname: 'Hoffmann',
			beitrittsdatum: new Date('January 1, 2011'),
			abteilung: 'Unternehmensberater',
			alter: 0
		},
		{
			vorname: 'Lisanne',
			nachname: 'Voigt',
			beitrittsdatum: new Date('June 1, 2022'),
			abteilung: 'Social Media',
			alter: 15
		},
		{
			vorname: 'Simon',
			nachname: 'Prior',
			beitrittsdatum: new Date('September 1, 2022'),
			abteilung: 'Social Media',
			alter: 14
		},
		{
			vorname: 'Connor',
			nachname: 'Schindler',
			beitrittsdatum: new Date('september 1, 2022'),
			abteilung: 'Azubi',
			alter: 14
		},
		{
			vorname: 'Felix',
			nachname: 'Pruchhorst',
			beitrittsdatum: new Date('september 1, 2022'),
			abteilung: 'Azubi',
			alter: 14
		},
		{
			vorname: 'Julius',
			nachname: 'Frerich',
			beitrittsdatum: new Date('September 1, 2022'),
			abteilung: 'Azubi',
			alter: 14
		},
		{
			vorname: 'Alexander',
			nachname: 'Noll',
			beitrittsdatum: new Date('September 1, 2022'),
			abteilung: 'Azubi',
			alter: 15
		},
		{
			vorname: 'Jan',
			nachname: 'Jesper',
			beitrittsdatum: new Date('september 1, 2022'),
			abteilung: 'Azubi',
			alter: 14
		},
		{
			vorname: 'Ben',
			nachname: 'Jesper',
			beitrittsdatum: new Date('September 1, 2022'),
			abteilung: 'Azubi',
			alter: 14
		},
		{
			vorname: 'Jakob',
			nachname: 'Schmauch',
			beitrittsdatum: new Date('September 1, 2022'),
			abteilung: 'Azubi',
			alter: 16
		},
		{
			vorname: 'Henry',
			nachname: 'Siatecki',
			beitrittsdatum: new Date('June 1, 2022'),
			abteilung: 'Marketing',
			alter: 16
		}
	];
</script>

<div class="main">
	<h1><u>Unsere Mitglieder</u></h1>
</div>
{#each mitglieder as mitglied}
	<Mitglied
		vorname={mitglied.vorname}
		abteilung={mitglied.abteilung}
		alter={mitglied.alter}
		beitrittsdatum={mitglied.beitrittsdatum}
		nachname={mitglied.nachname}
	/>
{/each}

<style>
	.main {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: x-large;
	}
</style>
