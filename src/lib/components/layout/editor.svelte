<script lang="ts">
	import CKEditor from "ckeditor5-svelte";
	import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';

	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';

	let element: HTMLElement;
	let editor: Awaited<ReturnType<typeof ClassicEditor.create>> | undefined;

	export let content: string;

	onMount(async () => {
		const ClassicEditor = (await import('@ckeditor/ckeditor5-editor-classic/src/classiceditor.js'))
			.default;
		editor = await ClassicEditor.create(element, {
			plugins: await Promise.all([
				import('@ckeditor/ckeditor5-alignment/src/alignment.js'),
				import('@ckeditor/ckeditor5-autoformat/src/autoformat.js'),
				import('@ckeditor/ckeditor5-block-quote/src/blockquote.js'),
				import('@ckeditor/ckeditor5-basic-styles/src/bold.js'),
				import('@ckeditor/ckeditor5-essentials/src/essentials.js'),
				import('@ckeditor/ckeditor5-heading/src/heading.js'),
				import('@ckeditor/ckeditor5-indent/src/indent.js'),
				import('@ckeditor/ckeditor5-basic-styles/src/italic.js'),
				import('@ckeditor/ckeditor5-link/src/link.js'),
				import('@ckeditor/ckeditor5-list/src/list.js'),
				import('@ckeditor/ckeditor5-media-embed/src/mediaembed.js'),
				import('@ckeditor/ckeditor5-paragraph/src/paragraph.js'),
				import('@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice.js'),
				import('@ckeditor/ckeditor5-table/src/table.js'),
				import('@ckeditor/ckeditor5-table/src/tabletoolbar.js'),
				import('@ckeditor/ckeditor5-autosave/src/autosave.js')
			]).then((modules) => modules.map((module) => module.default)),
			autosave: {
				save(editor) {
					return (async () => {
						content = editor.data.get();
					})();
				}
			}
		})
			.then((editor) => {
				if (browser) {
					window.editor = editor;
				}
				return editor;
			})
			.catch((error) => {
				console.error('There was a problem initializing the editor.', error);
				return undefined;
			});
	});

	onDestroy(() => {
		editor?.destroy();
	});
</script>

<div bind:this={element} />
