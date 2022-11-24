<script lang="ts">
	import EditorJS from '@editorjs/editorjs';
	import Header from '@editorjs/header';
	import List from '@editorjs/list';
	import { onMount } from 'svelte';

	export let data: Awaited<ReturnType<typeof get_data>>;
	export let editable: boolean;

	const editor_id = 'editorjs';

	let editor: EditorJS | undefined = undefined;

	onMount(() => {
		editor = new EditorJS({
			holder: editor_id,
			tools: {
				header: Header,
				list: List
			}
		});
		if (data !== '') {
			editor.render(JSON.parse(data));
		}
	});

	export async function get_data() {
		if (!editor) {
			console.warn('Editor not initialized');
			return '';
		}
		return JSON.stringify(await editor.save());
	}
</script>

<div id={editor_id} />
