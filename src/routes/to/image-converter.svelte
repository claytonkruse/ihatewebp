<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { onMount } from 'svelte';

	let { format, ext = format.toLowerCase() } = $props();

	let file_input: HTMLInputElement;
	let input_message = $state();
	let error: string | undefined = $state();

	function handleInput() {
		error = undefined;
		input_message = 'Select images...';
		const numFiles = file_input.files?.length;
		if (numFiles) {
			if (numFiles === 1) input_message = 'Selected 1 file.';
			else input_message = `Selected ${file_input?.files?.length} files.`;
		}
	}

	onMount(() => {
		handleInput();
	});

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const { files } = file_input;
		if (!files || files.length < 1) return (error = 'You must select files.');

		for (const file of files) {
			const reader = new FileReader();
			reader.addEventListener('load', () => {
				const img = new Image();
				img.src = reader.result as string;
				img.addEventListener('load', () => {
					const canvas = document.createElement('canvas');
					const ctx = canvas.getContext('2d');

					canvas.width = img.width;
					canvas.height = img.height;
					ctx?.drawImage(img, 0, 0);

					const a = document.createElement('a');
					a.href = canvas.toDataURL('image/' + format.toLowerCase());

					const name = file.name.split('.').slice(0, -1).join('.');
					a.download = name + '.' + ext;
					a.click();

					a.remove();
					canvas.remove();
				});
			});
			reader.readAsDataURL(file);
		}
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();

		if (!e.dataTransfer?.files.length) return;
		file_input.files = e.dataTransfer.files;

		handleInput();
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
							oninput={handleInput}
						/>
						{input_message}
					</Button>
				</label>
				<Button type="submit">Submit</Button>
				{#if error}
					<div>{error}</div>
				{/if}
			</form>
		</Card.Content>
	</Card.Root>
</div>
