<script lang="ts">
	import { formats } from './formats';
	import { Button } from '$lib/components/ui/button';

	type SC = {
		name: string;
		link: string;
	};
	let scs: Array<SC> = [];
	for (const f1 of formats) {
		const f1_aliases = [f1.name, ...(f1.aliases ?? [])];
		for (const f1a of f1_aliases) {
			for (const f2 of formats) {
				const f2_aliases = [f2.name, ...(f2.aliases ?? [])];
				for (const f2a of f2_aliases) {
					scs = [
						...scs,
						{
							name: `${f1a} to ${f2a} Converter`,
							link: f2.name.toLowerCase()
						}
					];
				}
			}
		}
	}
	scs = scs.sort((a, b) => a.name.localeCompare(b.name)); // sort alphabetically
</script>

<svelte:head>
	<title>Image Converters - Toolbox</title>
</svelte:head>

<hgroup class="mb-2">
	<h1 class="text-3xl">Image Converters</h1>
	<h2 class="text-muted-foreground">Free and Unlimited Image Converters</h2>
</hgroup>

<nav>
	<ul>
		{#each formats.sort((a, b) => a.name.localeCompare(b.name)) as format}
			<li>
				<Button variant="link" class="block h-auto py-1" href={format.name.toLowerCase()}
					>{format.name} Converter</Button
				>
			</li>
		{/each}
	</ul>
</nav>

<br />
<section>
	<h3 class="mb-1 text-xl font-bold">Specific Converters</h3>
	<nav>
		<ul>
			{#each scs as converter}
				<Button variant="link" class="block	h-auto py-1" href={converter.link}
					>{converter.name}</Button
				>
			{/each}
		</ul>
	</nav>
</section>
