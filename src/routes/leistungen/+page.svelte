<script lang="ts">
	import IndexFields from '$lib/components/site/fields/action_fields.svelte';
</script>

<div class="outer">
	<div class="page">
		<h1>Unsere Leistungen</h1>
		<h2>Wir für Sie</h2>
		<p>
			Wir helfen Ihnen <br>- Energie zu sparen <br>- Kosten zu senken <br>- Die Umwelt zu schützen
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
