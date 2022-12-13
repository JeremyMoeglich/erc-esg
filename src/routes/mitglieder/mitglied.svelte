<script lang="ts">
	import DbImage from '$lib/components/elements/db_image/db_image.svelte';

	export let vorname: string;
	export let nachname: string;
	export let alter: number;
	export let beitrittsdatum: Date;
	export let abteilung: string;
</script>

<div class="outer">
	<DbImage id={`mitglied-${vorname}-${nachname}`} width={"100px"}/>
	<div>
		<u>Vorname:</u> <br /> {vorname}
	</div>
	<div>
		<u>Nachname:</u> <br /> {nachname}
	</div>
	<div>
		<u>Alter:</u> <br /> {alter}
	</div>
	<div>
		<u>Beitrittsdatum:</u> <br /> {beitrittsdatum.toLocaleDateString('de')}
	</div>
	<div>
		<u>Abteilung:</u> <br /> {abteilung}
	</div>
</div>

<style>
    .outer {
        display: flex;
        gap: 20px;
        align-items: center;
        font-size: 20px;
    }
</style>