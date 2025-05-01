<script lang="ts">
	import FileSelector from '$lib/components/FileSelector.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let files: FileList | undefined = $state();

	let src: string | undefined = $state();

	import { getDataURLFromFile, rotate, save } from '$lib/imageUtils';
	async function onchange() {
		if (!files) return;
		src = await getDataURLFromFile(files[0]);
	}

	let loading = $state(false);

	async function rotateN(n = 1) {
		if (!src) return;

		loading = true;
		// TODO: Make 180 and 270 deg rotations faster.
		for (let i = 0; i < n; i++) src = await rotate(src);
		loading = false;
	}

	import RotateIcon from '~icons/tabler/rotate-clockwise-2';
	import { Save } from '$lib/icons';
</script>

<div class="m-auto max-w-sm">
	<h1 class="text-xl font-bold">Rotate Image</h1>

	{#if src}
		<br />
		<div class="flex justify-center gap-1">
			<Button class="gap-1" onclick={() => rotateN()}><RotateIcon /> 90&deg</Button>
			<Button onclick={() => rotateN(2)}>180&deg</Button>
			<Button onclick={() => rotateN(3)}>270&deg</Button>
		</div>
	{/if}

	<br />
	<FileSelector bind:files {onchange}>
		{#if src}
			<img class="m-auto max-h-96" class:animate-pulse={loading} {src} alt="Rotated" />
		{/if}
	</FileSelector>

	{#if src}
		<br />
		<div class="text-center">
			<Button
				class="gap-1"
				onclick={() => save(src!, 'rotated_' + files![0].name.split('.')[0] + '.png')}
				><Save /> Save Image</Button
			>
		</div>
	{/if}
</div>
