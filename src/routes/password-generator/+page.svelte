<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';

	import PassphraseGenerator from './PassphraseGenerator.svelte';
	import PasswordGenerator from './PasswordGenerator.svelte';
	import PINGenerator from './PINGenerator.svelte';
</script>

<h1>Password Generator</h1>

<div class="m-auto mt-10 max-w-sm">
	<Tabs.Root value="passphrase">
		<Tabs.List>
			<Tabs.Trigger value="passphrase">Passphrase</Tabs.Trigger>
			<Tabs.Trigger value="password">Passcode</Tabs.Trigger>
			<Tabs.Trigger value="pin">PIN</Tabs.Trigger>
		</Tabs.List>

		<Tabs.Content value="passphrase">
			<PassphraseGenerator />
		</Tabs.Content>

		<Tabs.Content value="password">
			<PasswordGenerator />
		</Tabs.Content>

		<Tabs.Content value="pin">
			<PINGenerator />
		</Tabs.Content>
	</Tabs.Root>
</div>
