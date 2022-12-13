<script lang="ts">
	import DbImage from '$lib/components/elements/db_image/db_image.svelte';

	export let vorname: string;
	export let nachname: string;
	export let alter: number;
	export let beitrittsdatum: Date;
	export let abteilung: string;
</script>

<div class="outer">
	<DbImage id={`mitglied-${vorname}-${nachname}`} width={"200px"}/>
	<div>
		Vorname: {vorname}
	</div>
	<div>
		Nachname: {nachname}
	</div>
	<div>
		Alter: {alter}
	</div>
	<div>
		Beitrittsdatum: {beitrittsdatum.toLocaleDateString('de')}
	</div>
	<div>
		Abteilung: {abteilung}
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