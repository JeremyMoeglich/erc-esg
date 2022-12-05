<script lang="ts">
	import IndexFields from '$lib/components/site/fields/action_fields.svelte';
</script>

<div class="outer">
	<div class="page">
		<h1>Unsere Leistungen</h1>
		<h2>Wir für Sie</h2>
		<div>
			<h3>Wir helfen Ihnen</h3>
			<ul>
				<li>Energie zu sparen</li>
				<li>Kosten zu senken</li>
				<li>Die Umwelt zu schützen</li>
			</ul>
		</div>
	</div>
	<IndexFields />
</div>

<style>
	h1 {
		text-align: center;
		font-size: 70px;
	}
	h2 {
		font-size: 35px;
	}
	.page {
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 100%;
		padding: 30px;
	}
	.outer {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
	ul,
	h3 {
		font-size: 25px;
		font-family: 'Raleway', sans-serif;
	}
	li {
		margin-left: 8px;
	}
	h2,
	h1 {
		color: var(--primary-hint-dark);
	}
</style>
