<script lang="ts">
	import Fraction from 'fraction.js';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import FileSelector from '$lib/components/FileSelector.svelte';
	import { getDataURLFromFile, letterbox } from '$lib/imageUtils';
	import SaveButton from '$lib/components/SaveButton.svelte';
	import ImagePreview from '$lib/components/ImagePreview.svelte';

	let w = $state(4);
	let h = $state(3);

	onMount(() => {
		w = Number(page.url.searchParams.get('w')) || w;
		h = Number(page.url.searchParams.get('h')) || h;
	});

	let files: FileList | undefined = $state();

	let f = $derived(new Fraction(w || 0, h || 1));

	function setR(nw: number | bigint, nh: number | bigint) {
		w = Number(nw);
		h = Number(nh);
		updateUrl();
	}

	function P(x: number, y: number) {
		const selected = (Number(f.n) === x && Number(f.d) === y) || (w === x && h === y);
		return {
			variant: (selected ? 'default' : 'outline') as 'default' | 'outline',
			onclick: () => setR(x, y)
		};
	}

	function updateUrl() {
		if (!w || !h) return;
		goto(`?w=${w}&h=${h}`, { keepFocus: true });
	}

	let color = $state('#000');

	let originalSrc = $state('');
	let src = $state('');
	$effect(() => {
		(async () => (src = await letterbox(originalSrc, w / h, color)))();
	});

	async function onchange() {
		if (!files) return;
		originalSrc = await getDataURLFromFile(files[0]);
	}
</script>

<hgroup>
	<h1 class="text-3xl font-bold">Letterbox</h1>
	<p>Change the aspect ratio of an image by letterboxing or pillarboxing (adding black bars).</p>
</hgroup>

<br />
<FileSelector accept="image/*" bind:files {onchange}>
	{#if files?.length}
		<br />
		<ImagePreview {src}></ImagePreview>
	{/if}
</FileSelector>

{#if files?.length}
	<br />
	<h2 class="mb-1 font-bold">Ratio</h2>
	<div class="flex flex-col gap-1">
		<div class="flex justify-center gap-1">
			<Button {...P(4, 3)}>4:3</Button>
			<Button {...P(1, 1)}>1:1</Button>
			<Button {...P(16, 9)}>16:9</Button>
			<Button {...P(9, 16)}>9:16</Button>
			<Button {...P(21, 9)}>21:9</Button>
			<Button {...P(2, 1)}>2:1</Button>
		</div>

		<div class="mt-2 text-center">
			<Input
				type="number"
				min="1"
				class="inline-block w-16"
				bind:value={w}
				oninput={updateUrl}
				placeholder="w"
			/>
			:
			<Input
				type="number"
				min="1"
				class="inline-block w-16"
				bind:value={h}
				oninput={updateUrl}
				placeholder="h"
			/>
			{#if f.n < (w || 0n)}
				<br />
				<Button variant="ghost" onclick={() => setR(f.n, f.d)}>= {f.n}:{f.d}</Button>
			{/if}
		</div>
	</div>

	<br />
	<h2 class="mb-2 font-bold">Bar Color</h2>
	<div class="flex flex-col gap-1">
		<div class="flex justify-center gap-1">
			<Button variant={color === '#000' ? 'default' : 'outline'} onclick={() => (color = '#000')}
				>Black</Button
			>
			<Button variant={color === '#FFF' ? 'default' : 'outline'} onclick={() => (color = '#FFF')}
				>White</Button
			>
			<Button
				variant={color === '#00000000' ? 'default' : 'outline'}
				onclick={() => (color = '#00000000')}>Transparent</Button
			>
			<!-- TODO: Add image backround option. -->
			<!-- TODO: Add blur option? -->
		</div>
		<div class="flex justify-center gap-1">
			<Input type="text" name="color" placeholder="#000000" bind:value={color} class="max-w-24" />
		</div>
	</div>

	<br />
	<SaveButton dataURL={src} filename={'letterbox_' + files![0].name.split('.')[0] + '.png'} />
{/if}
