<script lang="ts">
	import FileSelector from '$lib/components/FileSelector.svelte';
	import { rmTransparency, save } from '$lib/imageUtils';
	import SaveButton from '$lib/components/SaveButton.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let files: FileList | undefined = $state();
	let src = $state('');
	let bgColor = $state('#FFF');

	async function onchange() {
		src = await rmTransparency(files![0], bgColor);
	}

	function setBg(c: string) {
		bgColor = c;
		onchange();
	}
</script>

<svelte:head>
	<title>Replace Image Transparency - iHATEWebP</title>
</svelte:head>

<hgroup>
	<h1 class="text-3xl font-bold">Replace Image Transparency</h1>
	<p>Replace the transparency of an image with the color of your choice.</p>
</hgroup>

<br />
<div class="m-auto max-w-sm">
	<FileSelector bind:files {onchange} />
</div>

{#if src}
	<br />
	<h2 class="font-bold">Background Color</h2>
	<div class="flex justify-center gap-1">
		<Button variant={bgColor === '#FFF' ? 'default' : 'outline'} onclick={() => setBg('#FFF')}
			>White</Button
		>
		<Button variant={bgColor === '#000' ? 'default' : 'outline'} onclick={() => setBg('#000')}
			>Black</Button
		>
	</div>

	<br />
	<img {src} alt="Transparecy Removed" class="m-auto outline-dotted outline-1" />

	<br />
	<SaveButton
		dataURL={src}
		filename={'opaque_' + files![0].name.split('.')[0] + '.jpeg'}
		thing="JPEG"
	/>
{/if}
