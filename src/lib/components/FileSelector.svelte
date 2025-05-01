<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	import { Label } from './ui/label';

	import { createImgFromFile } from '$lib/imageUtils';

	let inputMessage = $state('Loading...');
	let fileInput: HTMLInputElement | undefined = $state();

	let {
		files = $bindable(),
		onchange: pOnChange,
		multiple = false,
		children,
		accept
	}: {
		files?: FileList;
		onchange?: Function;
		multiple?: true | false | undefined | null;
		children?: any;
		accept?: string;
	} = $props();

	let canvas: HTMLCanvasElement | undefined = $state();

	async function renderPreview() {
		if (!files?.length) return;
		if (!canvas) return console.error('Could not get canvas for selector preview.');
		const ctx = canvas.getContext('2d')!;
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		let num = files.length;
		if (num > 4) num = 4;
		console.log(num);
		for (let i = num - 1; i >= 0; i--) {
			const file = files[i];
			const img = await createImgFromFile(file);

			const nR = 4 / 3;

			const tw = 220;
			const th = tw / nR;

			const oR = img.width / img.height;

			let sx, sy, sw, sh;
			if (oR > nR) {
				sw = nR * img.height;
				sh = img.height;

				sx = (img.width - sw) / 2;
				sy = 0;
			} else {
				sw = img.width;
				sh = img.width / nR;

				sx = 0;
				sy = (img.height - sh) / 2;
			}

			const bw = 8; // border width

			const ox = 30 + i * -10;
			const oy = 30 + i * 23;

			ctx.translate(ox, oy);
			ctx.rotate((-(i - 0.8) * 3.14) / 16);

			ctx.fillStyle = '#FFF';
			ctx.shadowColor = 'rgba(0,0,0,0.5)';
			ctx.shadowBlur = 10;
			ctx.shadowOffsetX = 5;
			ctx.shadowOffsetY = 5;
			ctx.fillRect(0, 0, tw + 2 * bw, th + 2 * bw);

			ctx.shadowColor = '#00000000';
			ctx.drawImage(img, sx, sy, sw, sh, bw, bw, tw, th);

			ctx.resetTransform();
			img.remove();
		}

		ctx.shadowColor = '#000';
		ctx.shadowBlur = 6;
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.fillStyle = 'gold';
		ctx.font = 'bold 54px sans-serif';
		ctx.textAlign = 'right';
		ctx.fillText('' + files.length, 230, 230);
	}

	async function handleChange() {
		inputMessage = multiple ? 'Select Files' : 'Select File';
		document.body.classList.remove('border-zinc-500', 'border-8');
		if (!files?.length) return;

		let filename1 = files[0].name;
		if (filename1.length > 25) filename1 = filename1.slice(0, 10) + '...' + filename1.slice(-6);

		inputMessage = 'Selected ' + filename1;

		if (files.length !== 1) inputMessage += ' +' + (files.length - 1) + ' more';

		renderPreview();

		if (pOnChange) pOnChange();
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

<Label class="m-auto block w-max" for="file-input">
	<input
		class="hidden"
		id="file-input"
		name="file-input"
		type="file"
		{multiple}
		bind:this={fileInput}
		bind:files
		onchange={handleChange}
		{accept}
	/>

	{#if !files?.length}
		<Button
			variant="outline"
			class="m-auto hidden h-32 w-48 last:block"
			onclick={() => fileInput?.click()}
		>
			{inputMessage}
		</Button>
	{:else}
		<figure class="hidden last:block">
			<canvas width="304" height="280" bind:this={canvas}></canvas>
			<figcaption>{inputMessage}</figcaption>
		</figure>
	{/if}

	{@render children?.()}
</Label>
