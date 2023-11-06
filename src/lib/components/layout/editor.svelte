<script lang="ts">
	import Editor from '@tinymce/tinymce-svelte';

	export let content: string;
</script>

<Editor bind:value={content} apiKey={'ioru9d12rw4xwmzjv8qwqk2f4ejl03uop4uhzxknadll07ns'} conf={{
	plugins: "link"
}} />

<style>
	:global(.tox-statusbar__branding) {
		display: none !important;
	}
</style>
