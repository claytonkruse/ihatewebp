<script lang="ts">
	import { goto } from '$app/navigation';
	import FileSelector from '$lib/components/FileSelector.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import type { PageData } from './$types';
	import Fraction from 'fraction.js';
	let { data }: { data: PageData } = $props();
	let { w, h } = $derived(data);
	let files: FileList | undefined = $state();

	let f = $derived(new Fraction(w || 0, h || 1));

	let iw: bigint | undefined = $state();
	let ih: bigint | undefined = $state();
	$effect(() => {
		iw = w;
		ih = h;
	});

	function setR(nw: bigint, nh: bigint) {
		iw = nw;
		ih = nh;
		updateUrl();
	}

	function getP(x: number, y: number): { variant: 'default' | 'outline'; onclick: any } {
		return {
			variant: f.n === BigInt(x) && f.d === BigInt(y) ? 'default' : 'outline',
			onclick: () => setR(BigInt(x), BigInt(y))
		};
	}

	function updateUrl() {
		if (!iw || !ih) return;
		goto(`?w=${iw}&h=${ih}`, { keepFocus: true });
	}
</script>

<h1 class="text-xl font-bold">Resize Images</h1>
<h3>Aspect Ratio</h3>
<div class="flex justify-center gap-1">
	<Button {...getP(1, 1)}>1:1</Button>
	<Button {...getP(16, 9)}>16:9</Button>
	<Button {...getP(9, 16)}>9:16</Button>
	<Button {...getP(4, 3)}>4:3</Button>
</div>
<div class="text-center">
	<Input
		type="number"
		min="1"
		class="inline-block w-20"
		bind:value={iw}
		oninput={updateUrl}
		placeholder="w"
	/>
	:
	<Input
		type="number"
		min="1"
		class="inline-block w-20"
		bind:value={ih}
		oninput={updateUrl}
		placeholder="h"
	/>
	{#if f.n < (iw || 0n)}
		<br />
		<Button variant="ghost" onclick={() => setR(f.n, f.d)}>= {f.n}:{f.d}</Button>
	{/if}
</div>
<FileSelector bind:files />
