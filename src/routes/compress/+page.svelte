<script lang="ts">
	import FileSelector from '$lib/components/FileSelector.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import SaveButton from '$lib/components/SaveButton.svelte';
	import { createImgFromURL, getDataURLFromFile, scaleV } from '$lib/imageUtils';
	import ImagePreview from '$lib/components/ImagePreview.svelte';
	import ResolutionSelector from '$lib/components/ResolutionSelector.svelte';

	let files: FileList | undefined = $state();
	let src = $state('');
	let oldRes = $state(0);
	let newRes = $state(1080); // This should be overridden by the file's original resolution.
	let fileSize = $derived(getDataURLFileSize(src));
	let newFmt = $state('JPEG');
	$effect(() => {
		(async () => {
			const dataURL = await getDataURLFromFile(files![0]);
			// src = dataURL;
			const img = await createImgFromURL(dataURL);
			oldRes = img.height;
			newRes = img.height;
			img.remove();
		})();
	});
	$effect(() => {
		(async () => {
			src = await scaleV(files![0], newRes, undefined, newFmt.toLowerCase());
		})();
	});

	function getDataURLFileSize(dataURL: string): string {
		if (!dataURL) return '0 KB';
		const base64str = dataURL.split(',')[1];
		const imageFile = atob(base64str);
		// const imageFile = Buffer.from(base64str, 'base64');

		const bytes = imageFile.length;
		const KB = bytes / 1024;

		if (KB < 1024) {
			return Math.ceil(KB) + ' KB';
		} else {
			const MB = KB / 1024;
			return (MB + 0.05).toFixed(1) + ' MB';
		}
	}

	function P(fmt: string) {
		return {
			variant: (fmt === newFmt ? 'default' : 'outline') as 'default' | 'outline',
			onclick: () => (newFmt = fmt)
		};
	}
</script>

<svelte:head>
	<title>Compress Image - iHATEWebP</title>
	<meta
		name="description"
		content="A quick and simple image compressor. Compress images quickly for free."
	/>
	<meta
		name="keywords"
		content="image compress,image,photo,picture,compressor,compression,simple"
	/>
</svelte:head>

<hgroup>
	<h1 class="text-3xl font-bold">Simple Image Compress</h1>
</hgroup>
<p class:hidden={files?.length}>Is your picture too large to send? Compress it quickly!</p>

<br />
<FileSelector accept="image/*" bind:files>
	{#if files?.length}
		<br />
		<ImagePreview {src} />
	{/if}
</FileSelector>

{#if files?.length}
	<br />
	<h2 class="font-bold">New File Type</h2>
	<div class="flex justify-center gap-1">
		<Button {...P('PNG')}>PNG</Button>
		<Button {...P('JPEG')}>JPEG</Button>
		<Button {...P('WebP')}>WebP</Button>
		<Button {...P('AVIF')}>AVIF</Button>
	</div>

	<!-- <br />
	<h2 class="font-bold">Max File Size</h2>
	<div class="flex gap-1">
		<Button>2 MB</Button>
		<Button>4 MB</Button>
		<Button>5 MB</Button>
		<Button>10 MB</Button>
		<Button>50 MB</Button>
		<Button>100 MB</Button>
	</div>
	<Input type="number" /> -->

	<!-- Disable quality buttons based on Max File Size -->
	<br />
	<hgroup>
		<h2 class="font-bold">Vertical Resolution</h2>
		<p><small>Orignally {oldRes}</small></p>
	</hgroup>
	<ResolutionSelector maxShown={oldRes} bind:value={newRes} />

	<br />
	<h2 class="font-bold">New File Size</h2>
	<p>{fileSize}</p>

	<br />
	<SaveButton
		dataURL={src}
		filename={fileSize.replaceAll(' ', '') +
			'_compress_' +
			files![0].name.split('.')[0] +
			'.' +
			newFmt.toLowerCase()}
		thing={newFmt}
	/>
{/if}
