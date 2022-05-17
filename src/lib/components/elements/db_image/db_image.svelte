<script lang="ts">
	import DbImageEdit from './db_image_content.svelte';
	export let name: string;
	export let click: string | (() => void);
</script>

<div>
	<div>
		{#if typeof click === 'function'}
			<button on:click={click}>
				<DbImageEdit {name} />
			</button>
		{:else}
			<a href={click}>
				<DbImageEdit {name} />
			</a>
		{/if}
	</div>
</div>
