<script lang="ts">
	import type { PageData } from './$types';
	import * as zip from '@zip.js/zip.js';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { Progress } from '$lib/components/ui/progress';
	import { onMount } from 'svelte';
	import FileSelector from '$lib/components/FileSelector.svelte';
	import { Save } from '$lib/icons';

	let { data }: { data: PageData } = $props();
	let { name: format, aliases = [], ext = format.toLowerCase() } = data.format;

	let error: string = $state('');
	let prefersArchive = $state(false);

	let files: FileList | undefined = $state();
	let numFiles = $derived(files?.length || 0);
	let numConverted = $state(0);
	let numArchived = $state(0);

	let submitted = $state(false);
	let done = $state(false);

	async function reset() {
		files = undefined;
		submitted = false;
		done = false;
	}

	onMount(() => {
		prefersArchive = localStorage.getItem('prefersArchive') === 'true';
		localStorage.removeItem('prefersArchive');
		localStorage.setItem('prefersArchive', '' + prefersArchive); // refresh any potential expiry
	});

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		submitted = true;
		numConverted = 0;
		numArchived = 0;
		if (!files || files.length < 1) return (error = 'You must select files.');

		async function getDataUrl(file: File) {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');

			const img = (await new Promise(async (res, rej) => {
				const img = new Image();
				img.addEventListener('load', () => res(img));
				img.addEventListener('error', () => rej());
				img.src = await new Promise((res2, rej2) => {
					const reader = new FileReader();
					reader.addEventListener('load', () => res2(reader.result as string));
					reader.addEventListener('error', () => rej2());

					reader.readAsDataURL(file);
				});
			}).catch(() => (error += `Was unable to convert "${file.name}".`))) as HTMLImageElement;

			canvas.width = img.width;
			canvas.height = img.height;
			ctx?.drawImage(img, 0, 0);

			const url = canvas.toDataURL('image/' + format.toLowerCase());
			canvas.remove();
			numConverted++;
			return url;
		}

		function download(url: string, name: string) {
			const a = document.createElement('a');
			a.href = url;
			a.download = name;
			a.click();
			a.remove();
		}

		function rename(file: File) {
			return file.name.split('.').slice(0, -1).join('.') + '.' + ext;
		}

		if (prefersArchive && numFiles > 1) {
			const zipWriter = new zip.ZipWriter(new zip.BlobWriter('application/zip'));
			const promises = [];
			for (const file of files) {
				promises.push(
					getDataUrl(file).then((url) =>
						zipWriter.add(rename(file), new zip.HttpReader(url)).then(() => numArchived++)
					)
				);
			}
			promises.push(
				zipWriter.add(
					'thank_you.txt',
					new zip.TextReader(
						`Thank you for using my image converter! https://tools.clayk.cc/to/${format.toLowerCase()}/` +
							'\n'
					)
				)
			);
			await Promise.all(promises);
			download(URL.createObjectURL(await zipWriter.close()), `${numFiles}_to_${format}`);
		} else {
			const promises = [];
			for (const file of files) {
				promises.push(getDataUrl(file).then((url) => download(url, rename(file))));
			}
			await Promise.all(promises);
		}

		done = true;
	}
</script>

<svelte:head>
	<title>Unlimited {format} Converter - Toolbox</title>
</svelte:head>

{#if !submitted}
	<div class="inline-block h-max w-72 self-center text-center">
		<h1 class="text-xl font-bold">Convert Images to {format}</h1>
		<p>
			Convert images of any common format into the {format}{#each aliases as alias}/{alias}{/each}
			format.
		</p>
		<br />
		<form method="GET" action="/no-js/" onsubmit={handleSubmit}>
			<input type="hidden" name="from" value={$page.url.href} />

			<FileSelector bind:files />

			{#if numFiles}
				<br />
				{#if numFiles > 1}
					<label for="asarchive" class="mb-2 block">
						<input
							type="checkbox"
							name="asarchive"
							id="asarchive"
							bind:checked={prefersArchive}
							onchange={() => localStorage.setItem('prefersArchive', '' + prefersArchive)}
						/>
						Archive Files
					</label>
					{#if prefersArchive}
						<Button type="submit" class="gap-1"><Save /> Save Archive</Button>
					{:else}
						<Button type="submit" class="gap-1"><Save /> Save All</Button>
					{/if}
				{:else}
					<Button type="submit" class="gap-1"><Save /> Save Image</Button>
				{/if}
			{/if}
			{#if error}
				<div>{error}</div>
			{/if}
		</form>
	</div>
{:else if !done}
	<h1 class="text-3xl">Converting Files...</h1>
	<p>Your download should start automatically.</p>
	<p class="uppercase">{numConverted}/{numFiles} Converted</p>
	<Progress value={numConverted} max={numFiles} />
	{#if numFiles > 1 && prefersArchive}
		<p class="uppercase">{numArchived}/{numFiles} Archived</p>
		<Progress value={numArchived} max={numFiles} />
	{/if}
	<p>{error}</p>
{:else}
	<h1 class="mb-3 text-3xl">Thank you for using my image converter!</h1>
	<Button onclick={reset}>Convert More</Button>
{/if}
