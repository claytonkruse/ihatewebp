<script lang="ts">
	import FileSelector from '$lib/components/FileSelector.svelte';
	import ImagePreview from '$lib/components/ImagePreview.svelte';
	import SaveButton from '$lib/components/SaveButton.svelte';
	import { Button } from '$lib/components/ui/button';
	import { flipPitch, flipYaw, getDataURLFromFile } from '$lib/imageUtils';

	// icons
	import Yaw from '~icons/solar/flip-horizontal-bold';
	import Pitch from '~icons/solar/flip-vertical-bold';

	let files: FileList | undefined = $state();
	let src = $state('');
	$effect(() => {
		(async () => {
			if (files?.length) src = await getDataURLFromFile(files[0]);
		})();
	});
</script>

<h1 class="text-3xl font-bold">Flip Image</h1>

<br />
<FileSelector accept="image/*" bind:files>
	{#if src}
		<figure>
			<ImagePreview {src} />
			<figcaption>{files![0].name}</figcaption>
		</figure>
	{/if}
</FileSelector>

{#if src}
	<br />
	<div class="flex justify-center gap-1">
		<Button onclick={async () => (src = await flipYaw(src))}><Yaw /> Flip Yaw</Button>
		<Button onclick={async () => (src = await flipPitch(src))}><Pitch /> Flip Pitch</Button>
	</div>

	<br />
	<SaveButton dataURL={src} filename={'flip_' + files![0].name} thing="PNG" />
{/if}
