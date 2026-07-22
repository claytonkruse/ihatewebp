<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';

	import { generatePassword } from './utilts';

	let lowercase = $state(true);
	let uppercase = $state(false);
	let numbers = $state(false);
	let specialChars = $state(false);
	let passwordLength = $state(30);
	let lowercaseClicked = $state(false);

	$effect(() => {
		if (!(lowercase || uppercase || numbers || specialChars)) {
			if (lowercaseClicked) {
				uppercase = true;
			} else {
				lowercase = true;
			}
		}
		lowercaseClicked = false;
	});

	const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
	const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const numberChars = '0123456789';
	const specialCharList = '!@#$%^&*()_+~|}{[]:;?><,./\\-=';
	const reasonableChars = lowercaseChars + uppercaseChars + numberChars + specialCharList;
	let charPool = $derived(
		[
			...new Set(
				'' +
					(lowercase ? lowercaseChars : '') +
					(uppercase ? uppercaseChars : '') +
					(numbers ? numberChars : '') +
					(specialChars ? specialCharList : '')
			)
		].join('')
	);

	let password = $derived(generatePassword(passwordLength, charPool));

	function evalPass(p: string) {
		const L = p.length;
		if (L === 0) return 0;

		const R = charPool.length;

		// Apply the mathematical formula: H = L * log2(R)
		// Note: Math.log2(R) calculates the log base 2 of R
		const H = Math.floor(L * Math.log2(R));

		return H;
	}

	let entropy = $derived(evalPass(password));
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Password</Card.Title>
		<Card.Description>Generate a traditional password.</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-6">
		<div class="grid gap-2">
			<div class="flex gap-3">
				<Label for="length">Length</Label>
				<Input type="number" min="1" max="100" id="length" bind:value={passwordLength} />
			</div>

			<div class="flex gap-3">
				<Switch id="lowercase" bind:checked={lowercase} onclick={() => (lowercaseClicked = true)} />
				<Label for="lowercase">Include Lowercase Letters</Label>
			</div>

			<div class="flex gap-3">
				<Switch id="uppercase" bind:checked={uppercase} />
				<Label for="uppercase">Include Uppercase Letters</Label>
			</div>

			<div class="flex gap-3">
				<Switch id="numbers" bind:checked={numbers} />
				<Label for="numbers">Include Numbers</Label>
			</div>

			<div class="flex gap-3">
				<Switch id="special_chars" bind:checked={specialChars} />
				<Label for="special_chars">Special Characters</Label>
			</div>
		</div>

		<!-- {#if specialChars}
			<div class="grid gap-2">
				<Label for="special_chars">Additional Characters</Label>
				<Input id="special_chars" type="text" />
			</div>
		{/if} -->
	</Card.Content>
	<Card.Footer class="block text-left">
		<div class="flex gap-1">
			<Input value={password} />
			<Button>Copy</Button>
		</div>
		<small
			>Entropy: <span class:text-pink-300={entropy < 80} class:text-green-700={entropy > 128}
				>{entropy}</span
			> (&gt;128 is good)</small
		>
	</Card.Footer>
</Card.Root>
