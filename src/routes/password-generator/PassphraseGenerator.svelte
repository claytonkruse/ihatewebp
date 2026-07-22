<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { Slider } from '$lib/components/ui/slider/index.js';

	let wordCount = $derived(0);
	let capitalizeFirst = $state(true);
	let capitalizeAll = $state(false);
	let punctuation = $state(true);
	let passphrase = $derived('a');
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Passphrase</Card.Title>
		<Card.Description>Generate a custom passphrase.</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-6">
		<div class="grid gap-2">
			<div class="grid gap-3">
				<Label for="word_count">
					<span class="text-nowrap">Word Count</span>
					<Slider type="single" id="word_count" bind:value={wordCount} min={2} max={30} />
					{wordCount}
				</Label>
			</div>

			<div class="flex gap-3">
				<Switch
					id="lowercase"
					bind:checked={capitalizeFirst}
					onclick={() => (capitalizeAll = !capitalizeFirst && capitalizeAll)}
				/>
				<Label for="lowercase">Capitalize First</Label>
			</div>

			<div class="flex gap-3">
				<Switch
					id="uppercase"
					bind:checked={capitalizeAll}
					onclick={() => (capitalizeFirst = capitalizeFirst || !capitalizeAll)}
				/>
				<Label for="uppercase">Capitalize All</Label>
			</div>

			<div class="flex gap-3">
				<Switch id="numbers" bind:checked={punctuation} />
				<Label for="numbers">Include Punctuation</Label>
			</div>

			<div class="flex gap-3">
				<Switch id="numbers" bind:checked={punctuation} />
				<Label for="numbers">Include Pokemon</Label>
			</div>

			<div class="flex gap-3">
				<Switch id="numbers" bind:checked={punctuation} />
				<Label for="numbers">Include Memes</Label>
			</div>

			<div class="flex gap-3">
				<Switch id="numbers" bind:checked={punctuation} />
				<Label for="numbers">Otaku</Label>
			</div>
		</div>
	</Card.Content>
	<Card.Footer class="block text-left">
		<div class="flex gap-1">
			<Input value={passphrase} />
			<Button>Copy</Button>
		</div>
	</Card.Footer>
</Card.Root>
