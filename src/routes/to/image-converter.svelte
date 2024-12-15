<script lang="ts">
	import { ZipWriter, BlobWriter, HttpReader } from '@zip.js/zip.js';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { onMount } from 'svelte';

	let { format, ext = format.toLowerCase() } = $props();

	let file_input: HTMLInputElement;
	let numFiles: number = $state(0);
	let input_message = $state();
	let error: string | undefined = $state();
	let asArchive = $state(false);

	function handleChange() {
		error = undefined;
		input_message = 'Select images...';
		const { files } = file_input;
		numFiles = files?.length ?? 0;
		if (files?.length) {
			if (files.length === 1) input_message = 'Selected 1 file.';
			else input_message = `Selected ${files.length} files.`;
		}
	}

	onMount(() => {
		handleChange();
		const prefersArchive = !!localStorage.getItem('prefersArchive');
		localStorage.setItem('prefersArchive', '' + prefersArchive); // refresh any potential expiry
		asArchive = numFiles > 1 && prefersArchive;
	});

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const { files } = file_input;
		if (!files || files.length < 1) return (error = 'You must select files.');

		async function getDataUrl(file: File) {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');

			const img = (await new Promise(async (res) => {
				const img = new Image();
				img.addEventListener('load', () => res(img));
				img.src = await new Promise((res2) => {
					const reader = new FileReader();
					reader.addEventListener('load', () => res2(reader.result as string));
					reader.readAsDataURL(file);
				});
			})) as HTMLImageElement;

			canvas.width = img.width;
			canvas.height = img.height;
			ctx?.drawImage(img, 0, 0);

			const url = canvas.toDataURL('image/' + format.toLowerCase());
			canvas.remove();
			return url;
		}

		function download(url: string, name: string) {
			const a = document.createElement('a');
			a.href = url;
			a.download = name;
			a.click();
			a.remove();
		}

		if (asArchive) {
			const zipWriter = new ZipWriter(new BlobWriter('application/zip'));
			const promises = [];
			for (const file of files) {
				const name = file.name.split('.').slice(0, -1).join('.') + '.' + ext;
				promises.push(getDataUrl(file).then((url) => zipWriter.add(name, new HttpReader(url))));
			}
			await Promise.all(promises);
			download(URL.createObjectURL(await zipWriter.close()), `to_${format}`);
		} else {
			for (const file of files) {
				const name = file.name.split('.').slice(0, -1).join('.') + '.' + ext;
				getDataUrl(file).then((url) => download(url, name));
			}
		}

		// for (const file of files) {
		// 	const reader = new FileReader();
		// 	reader.addEventListener('load', () => {
		// 		const img = new Image();
		// 		img.addEventListener('load', () => {
		// 			const canvas = document.createElement('canvas');
		// 			const ctx = canvas.getContext('2d');

		// 			canvas.width = img.width;
		// 			canvas.height = img.height;
		// 			ctx?.drawImage(img, 0, 0);

		// 			const a = document.createElement('a');
		// 			a.href = canvas.toDataURL('image/' + format.toLowerCase());
		// 			const name = file.name.split('.').slice(0, -1).join('.') + '.' + ext;
		// 			a.download = name;
		// 			a.click();
		// 			a.remove();

		// 			canvas.remove();
		// 		});
		// 		img.src = reader.result as string;
		// 	});
		// 	reader.readAsDataURL(file);
		// }
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();

		if (!e.dataTransfer?.files.length) return;
		file_input.files = e.dataTransfer.files;

		handleChange();
	}
</script>

<div
	class="flex h-full w-full justify-center pb-10"
	ondragover={(e) => e.preventDefault()}
	ondrop={handleDrop}
	role="region"
>
	<Card.Root class="inline-block h-max w-72 self-center text-center">
		<Card.Header>
			<Card.Title tag="h1">
				Convert Images to {format}
			</Card.Title>
			<Card.Description
				>Convert images of any common format into the {format}{#if ext !== format.toLowerCase()}/{ext.toUpperCase()}{/if}
				format.</Card.Description
			>
		</Card.Header>
		<Card.Content>
			<form method="GET" action="/no-js/" onsubmit={handleSubmit}>
				<input type="hidden" name="from" value={$page.url.href} />
				<label class="mb-3 block" for="file-input">
					<Button variant="outline" class="h-32 w-full" on:click={() => file_input.click()}>
						<input
							class="hidden"
							id="file-input"
							type="file"
							accept="image/*"
							multiple
							bind:this={file_input}
							onchange={handleChange}
						/>
						{input_message}
					</Button>
				</label>
				{#if numFiles}
					{#if numFiles > 1}
						<label for="asarchive" class="mb-2 block">
							<input
								type="checkbox"
								name="asarchive"
								id="asarchive"
								bind:checked={asArchive}
								onchange={() => localStorage.setItem('prefersArchive', '' + asArchive)}
							/>
							Archive Files
						</label>
						{#if asArchive}
							<Button type="submit" class="mb-1">Download Archive</Button>
						{:else}
							<Button type="submit" class="mb-1">Download All</Button>
						{/if}
					{:else}
						<Button type="submit">Download</Button>
					{/if}
				{/if}
				{#if error}
					<div>{error}</div>
				{/if}
			</form>
		</Card.Content>
	</Card.Root>
</div>
