<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { Slider } from '$lib/components/ui/slider/index.js';

	import wordlistRaw from './words.txt?raw';

	const wordlist = wordlistRaw
		.split('\n')
		.map((w) => w.trim())
		.filter((w) => w && !w.startsWith('#'));

	function pickRandomWords(count: number): string[] {
		const words: string[] = [];
		const arr = new Uint32Array(count);
		crypto.getRandomValues(arr);
		for (let i = 0; i < count; i++) {
			words.push(wordlist[arr[i] % wordlist.length]);
		}
		return words;
	}

	const punctuationMarks = ['.', '?', '!'];

	function pickPunctuation(): string {
		const arr = new Uint8Array(1);
		crypto.getRandomValues(arr);
		return punctuationMarks[arr[0] % punctuationMarks.length];
	}

	type Capitalization = 'lowercase' | 'first_only' | 'first' | 'all' | 'uppercase';

	const capitalizationOptions = [
		{ value: 'first', label: 'First & Proper Nouns' },
		{ value: 'first_only', label: 'First Only' },
		{ value: 'all', label: 'Capitalize All' },
		{ value: 'uppercase', label: 'Uppercase' },
		{ value: 'lowercase', label: 'Lowercase' }
	];

	function generatePassphrase(
		count: number,
		cap: Capitalization,
		usePunctuation: boolean,
		separator: string
	): string {
		let words = pickRandomWords(count);

		if (cap === 'lowercase' || cap === 'first_only') {
			words = words.map((w) => w.toLowerCase());
		} else if (cap === 'uppercase') {
			words = words.map((w) => w.toUpperCase());
		} else if (cap === 'all') {
			words = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1));
		}

		let result = words.join(separator);

		if (cap === 'first' || cap === 'first_only') {
			result = result.charAt(0).toUpperCase() + result.slice(1);
		}

		if (usePunctuation) {
			result += pickPunctuation();
		}

		return result;
	}

	const separatorPresets = [
		{ label: 'Space', value: ' ' },
		{ label: '_', value: '_' },
		{ label: '-', value: '-' },
		{ label: ',', value: ',' },
		{ label: ';', value: ';' },
		{ label: 'None', value: '' }
	];

	let wordCount = $state(5);
	let capitalization: Capitalization = $state('first');
	let wordSeparator = $state(' ');
	let includePunctuation = $state(true);
	let includePokemon = $state(false);
	let includeMemes = $state(false);
	let otaku = $state(false);
	let regenerateKey = $state(0);

	const triggerContent = $derived(
		capitalizationOptions.find((o) => o.value === capitalization)?.label ?? 'Capitalization'
	);

	let passphrase = $derived.by(() => {
		void regenerateKey;
		return generatePassphrase(wordCount, capitalization, includePunctuation, wordSeparator);
	});

	function setSeparator(value: string) {
		wordSeparator = value;
		regenerate();
	}

	function evalEntropy(): number {
		return Math.floor(wordCount * Math.log2(wordlist.length));
	}

	let entropy = $derived(evalEntropy());

	function regenerate() {
		regenerateKey++;
	}

	async function copyToClipboard() {
		await navigator.clipboard.writeText(passphrase);
	}
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Passphrase</Card.Title>
		<Card.Description>Generate a custom passphrase.</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-6">
		<div class="grid gap-2">
			<div class="grid gap-2">
				<Label for="word_separator">Word Separator</Label>
				<div class="flex flex-wrap gap-2 items-center">
					{#each separatorPresets as preset (preset.label)}
						<Button
							variant={wordSeparator === preset.value ? 'default' : 'outline'}
							size="sm"
							onclick={() => setSeparator(preset.value)}
						>
							{preset.label}
						</Button>
					{/each}
					<Input
						id="word_separator"
						type="text"
						bind:value={wordSeparator}
						oninput={() => regenerate()}
						placeholder="empty"
						class="max-w-20"
					/>
				</div>
			</div>

			<div class="mt-2 grid gap-3">
				<Label for="word_count">
					<span class="text-nowrap">Word Count</span>
					<Slider
						type="single"
						id="word_count"
						bind:value={wordCount}
						min={2}
						max={20}
						onValueChange={() => regenerate()}
					/>
					{wordCount}
				</Label>
			</div>

			<div class="flex gap-3 items-center">
				<Label>Capitalization</Label>
				<Select.Root type="single" bind:value={capitalization} onValueChange={() => regenerate()}>
					<Select.Trigger class="w-[180px]">
						{triggerContent}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{#each capitalizationOptions as option (option.value)}
								<Select.Item value={option.value} label={option.label}>
									{option.label}
								</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>

			<div class="flex gap-3">
				<Switch
					id="punctuation"
					bind:checked={includePunctuation}
					onCheckedChange={() => regenerate()}
				/>
				<Label for="punctuation">Include Punctuation</Label>
			</div>

			<div class="flex gap-3">
				<Switch id="pokemon" bind:checked={includePokemon} onCheckedChange={() => regenerate()} />
				<Label for="pokemon">Include Pokemon</Label>
			</div>

			<div class="flex gap-3">
				<Switch id="memes" bind:checked={includeMemes} onCheckedChange={() => regenerate()} />
				<Label for="memes">Include Memes</Label>
			</div>

			<div class="flex gap-3">
				<Switch id="otaku" bind:checked={otaku} onCheckedChange={() => regenerate()} />
				<Label for="otaku">Otaku</Label>
			</div>
		</div>
	</Card.Content>
	<Card.Footer class="block text-left">
		<div class="flex gap-1">
			<Input value={passphrase} readonly />
			<Button onclick={regenerate}>&#8635;</Button>
			<Button onclick={copyToClipboard}>Copy</Button>
		</div>
		<small>
			Entropy: <span class:text-pink-300={entropy < 80} class:text-green-700={entropy > 128}>
				{entropy}
			</span> (&gt;128 is good)
		</small>
	</Card.Footer>
</Card.Root>
