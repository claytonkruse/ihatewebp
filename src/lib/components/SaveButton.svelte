<script lang="ts">
	import { Button } from './ui/button';
	import { Save } from '$lib/icons';
	import { save } from '$lib/imageUtils';
	let { dataURL, thing = 'Image', filename, promise = new Promise(() => {}) } = $props();

	function onclick() {
		if (dataURL) save(dataURL, filename);
	}
</script>

<Button {onclick} disabled={!dataURL} class="gap-1 bg-green-400 text-primary dark:bg-green-600"
	><Save /> Save {thing}</Button
>
