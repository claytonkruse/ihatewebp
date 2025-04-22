<script lang="ts">
	import FileSelector from '$lib/components/FileSelector.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let files: FileList | undefined = $state();

	let src: string | undefined = $state();

	import { getDataURLFromFile, rotate, download } from '$lib/imageUtils';
	async function onChange() {
		if (!files) return;
		src = await rotate(await getDataURLFromFile(files[0]));
	}

	async function onclick() {
		if (!src) return;
		src = await rotate(src);
	}

	import RotateIcon from '~icons/tabler/rotate-clockwise-2';
	import { Save } from '$lib/icons';
</script>

<div class="m-auto max-w-sm">
	<h1 class="text-xl font-bold">Rotate Image</h1>

	{#if src}
		<br />
		<div class="text-center">
			<Button class="gap-1" {onclick}><RotateIcon /> Rotate</Button>
		</div>
	{/if}
	<br />
	<FileSelector bind:files {onChange}>
		{#if src}
			<img class="m-auto max-h-96" {src} alt="Rotated" />
		{/if}
	</FileSelector>
	{#if src}
		<br />
		<div class="text-center">
			<Button
				class="gap-1"
				onclick={() => download(src!, 'rotated_' + files![0].name.split('.')[0] + '.png')}
				><Save /> Save Image</Button
			>
		</div>
	{/if}
</div>
