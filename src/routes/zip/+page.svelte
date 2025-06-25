<script lang="ts">
	import FileSelector from '$lib/components/FileSelector.svelte';
	import SaveButton from '$lib/components/SaveButton.svelte';

	let files: FileList | undefined;
</script>

<h1 class="text-3xl font-bold">Create a ZIP Archive</h1>

<FileSelector multiple bind:files />

<SaveButton dataURL="" filename="archive.zip" thing="as ZIP" />
