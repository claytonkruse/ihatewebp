<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Slider } from '$lib/components/ui/slider';
	import { generatePassword } from './utilts';

	let length = $state(4);
	let pin = $derived(generatePassword(length, '0123456789'));
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>PIN</Card.Title>
		<Card.Description>
			<p>Generate a numeric PIN.</p>
			<p>Do not use this for secure applications, as PINs are vulnerable to brute-force attacks.</p>
		</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-6">
		<div class="grid gap-3">
			<Label for="tabs-demo-name">
				Length
				<Slider id="tabs-demo-name" type="single" bind:value={length} min={4} max={10} step={1} />
				{length}
			</Label>
		</div>
	</Card.Content>
	<Card.Footer class="gap-1">
		<Input value={pin} />
		<Button>Copy</Button>
	</Card.Footer>
</Card.Root>
