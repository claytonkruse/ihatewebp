<script lang="ts">
	import FileSelector from '$lib/components/FileSelector.svelte';
	import ImagePreview from '$lib/components/ImagePreview.svelte';
	import ResolutionSelector from '$lib/components/ResolutionSelector.svelte';
	import SaveButton from '$lib/components/SaveButton.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { scaleV } from '$lib/imageUtils';

	let files: FileList | undefined = $state();
	let bgColor = $state('#00000000');
	let vRes = $state(1080);
	let src = $state('');
	$effect(() => {
		(async () => (src = await scaleV(files?.[0], vRes, bgColor)))();
	});

	function P(bg: string) {
		return {
			variant: (bgColor === bg ? 'default' : 'outline') as 'default' | 'outline',
			onclick: () => {
				bgColor = bg;
			}
		};
	}
</script>

<svelte:head>
	<title>Rasterize Vector Graphic (SVG to PNG) - iHATEWebP</title>
</svelte:head>

<hgroup>
	<h1 class="text-3xl font-bold">Rasterize Vector Graphic</h1>
	<p class:hidden={files?.length}>Convert SVG files into PNG files of any size that you need.</p>
</hgroup>

<br />
<FileSelector accept=".svg" bind:files>
	{#if files?.length}
		<br />
		<ImagePreview {src} />

		<h2 class="font-bold">{files[0].name}</h2>
	{/if}
</FileSelector>

{#if files?.length}
	<br />
	<h2 class="font-bold">Vertical Resolution</h2>
	<ResolutionSelector bind:value={vRes} />

	<br />
	<h2 class="font-bold">Background Color</h2>
	<div class="flex justify-center gap-1">
		<Button {...P('#00000000')}>Transparent</Button>
		<Button {...P('#FFF')}>White</Button>
		<Button {...P('#000')}>Black</Button>
	</div>

	<br />
	<SaveButton
		thing="as PNG"
		dataURL={src}
		filename={vRes + '_rasterized_' + files![0].name.split('.')[0] + '.png'}
	/>
{/if}
