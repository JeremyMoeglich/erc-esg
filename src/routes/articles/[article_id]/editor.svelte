<script lang="ts">
	import { browser } from '$app/environment';
	import type EditorJS from '@editorjs/editorjs';

	import { onMount } from 'svelte';

	export let data: Awaited<ReturnType<typeof get_data>>;
	export let editable: boolean;

	const editor_id = 'editorjs';

	let editor: EditorJS | undefined = undefined;

	onMount(async () => {
		if (browser) {
			const EditorJS = (await import('@editorjs/editorjs')).default;
			const Header = (await import('@editorjs/header')).default;
			const List = (await import('@editorjs/list')).default;
			const editor_data = (() => {
				try {
					return JSON.parse(data);
				} catch (e) {
					return undefined;
				}
			})()
			editor = new EditorJS({
				holder: editor_id,
				tools: {
					header: Header,
					list: List
				},
				data: editor_data,
				readOnly: !editable,
				placeholder: editable ? 'Start writing...' : undefined
			});
		}
	});

	export async function get_data() {
		if (!editor) {
			console.warn('Editor not initialized');
			return '';
		}
		await editor.isReady;
		return JSON.stringify(await editor.save());
	}
</script>

<div class="editor_outer">
	<div id={editor_id} />
</div>

<style>
	.editor_outer {
		width: 100%;
		height: 100%;
		border: 1px solid rgb(214, 214, 214);
		border-radius: 10px;
	}
</style>
