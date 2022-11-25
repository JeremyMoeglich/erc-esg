<script lang="ts">
	import IndexFields from '$lib/components/site/fields/action_fields.svelte';
</script>

<div class="outer">
	<div class="page">
		<h1>Unsere Leistungen</h1>
		<h2>Wir für Sie</h2>
		<p>
			Die ERC eSG berät Sie gerne in puncto Energieeinsparung. Wir sind unabhängig, kompetent und
			motiviert, zusammen mit Ihnen einen Beitrag zur Rettung unseres Planeten zu leisten. Anders
			als unsere Mitbewerber sind wir nicht auf externe Firmen angewiesen und beraten Sie völlig
			objektiv. Außerdem sind wir nicht so kostenintensiv wie unsere Konkurrenten. Langfristig
			werden die Energiekosten immer teurer. Mit unseren praktischen Tipps können Sie die Kosten
			senken. Unser Angebot richtet sich primär an Privathaushalte sowie kleine Betriebe. Unser Ziel
			ist die Senkung des Energieverbrauchs und eine damit verbundene Entlastung der Umwelt, die
			auch Ihrem Geldbeutel zu Gute kommt.
		</p>
	</div>
	<IndexFields />
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
	h1 {
		text-align: center;
		font-size: 70px;
	}
	h2 {
		font-size: 35px;
	}
	.page {
		width: 1300px;
	}
	.outer {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
	p {
		font-size: 25px;
		font-family: 'Raleway', sans-serif;
	}
	h2,
	h1 {
		color: var(--primary-hint-dark);
	}
</style>
