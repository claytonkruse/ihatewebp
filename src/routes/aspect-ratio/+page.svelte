<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import FileSelector from '$lib/components/FileSelector.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import Fraction from 'fraction.js';
	import { onMount } from 'svelte';

	let w: bigint | undefined = $state();
	let h: bigint | undefined = $state();

	onMount(() => {
		w = BigInt(page.url.searchParams.get('w') ?? 0) || undefined;
		h = BigInt(page.url.searchParams.get('h') ?? 0) || undefined;
	});

	let files: FileList | undefined = $state();

	let f = $derived(new Fraction(w || 0, h || 1));

	function setR(nw: bigint, nh: bigint) {
		w = nw;
		h = nh;
		updateUrl();
	}

	function getP(x: number, y: number): { variant: 'default' | 'outline'; onclick: any } {
		return {
			variant: f.n === BigInt(x) && f.d === BigInt(y) ? 'default' : 'outline',
			onclick: () => setR(BigInt(x), BigInt(y))
		};
	}

	function updateUrl() {
		if (!w || !h) return;
		goto(`?w=${w}&h=${h}`, { keepFocus: true });
	}
</script>

<h1 class="text-xl font-bold">Aspect Ratio Letterboxing Tool</h1>
<h3>Common Ratios</h3>
<div class="flex justify-center gap-1">
	<Button {...getP(1, 1)}>1:1</Button>
	<Button {...getP(16, 9)}>16:9</Button>
	<Button {...getP(9, 16)}>9:16</Button>
	<Button {...getP(4, 3)}>4:3</Button>
</div>

<h3>Custom Ratio</h3>
<div class="text-center">
	<Input
		type="number"
		min="1"
		class="inline-block w-20"
		bind:value={w}
		oninput={updateUrl}
		placeholder="w"
	/>
	:
	<Input
		type="number"
		min="1"
		class="inline-block w-20"
		bind:value={h}
		oninput={updateUrl}
		placeholder="h"
	/>
	{#if f.n < (w || 0n)}
		<br />
		<Button variant="ghost" onclick={() => setR(f.n, f.d)}>= {f.n}:{f.d}</Button>
	{/if}
</div>
<FileSelector bind:files />
