<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';

	let inputMessage = $state('Loading...');
	let fileInput: HTMLInputElement | undefined = $state();

	let { files = $bindable() }: { files: FileList | undefined } = $props();

	function handleChange() {
		inputMessage = `Select Files`;
		document.body.classList.remove('border-zinc-500', 'border-8');
		if (files?.length) {
			if (files.length === 1) inputMessage = 'Selected 1 file.';
			else inputMessage = `Selected ${files.length} files.`;
		}
	}

	function changeFiles(newFiles: FileList) {
		if (!fileInput) return;
		files = newFiles;
		handleChange();
	}

	function ondrop(e: DragEvent) {
		e.preventDefault();

		const files = e.dataTransfer?.files;
		if (!files?.length) return;
		changeFiles(files);
	}

	function onpaste(e: ClipboardEvent) {
		const files = e.clipboardData?.files;
		if (!files?.length) return;
		changeFiles(files);
	}

	function ondragenter(e: Event) {
		e.preventDefault();
		document.body.classList.add('border-zinc-500', 'border-8');
	}

	function ondragleave(e: Event) {
		e.preventDefault();
		document.body.classList.remove('border-zinc-500', 'border-8');
	}

	onMount(() => {
		handleChange();
	});
</script>

<svelte:body
	ondragover={(e) => e.preventDefault()}
	{onpaste}
	{ondrop}
	{ondragenter}
	{ondragleave}
/>

<label class="mb-3 block" for="file-input">
	<Button variant="outline" class="h-32 w-full" onclick={() => fileInput?.click()}>
		<input
			class="hidden"
			id="file-input"
			type="file"
			accept="image/*"
			multiple
			bind:this={fileInput}
			bind:files
			onchange={handleChange}
		/>
		{inputMessage}
	</Button>
</label>
