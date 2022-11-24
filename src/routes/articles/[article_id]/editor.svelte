<script lang="ts">
	import EditorJS from '@editorjs/editorjs';
	import Header from '@editorjs/header';
	import List from '@editorjs/list';

	export let data: Awaited<ReturnType<typeof get_data>>;
	export let editable: boolean;

	const editor_id = 'editorjs';

	const editor = new EditorJS({
		holder: editor_id,
		tools: {
			header: Header,
			list: List
		}
	});

	if (data !== '') {
		editor.render(JSON.parse(data));
	}

	export async function get_data() {
		return JSON.stringify(await editor.save());
	}
</script>

<div id={editor_id} />
