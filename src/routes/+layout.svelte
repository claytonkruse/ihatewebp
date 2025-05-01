<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Provider as TooltipProvider } from '$lib/components/ui/tooltip/index.js';
	import Footer from '$lib/components/Footer.svelte';
	let { children } = $props();

	import { ModeWatcher, toggleMode, mode } from 'mode-watcher';

	import Sun from '~icons/line-md/moon-alt-to-sunny-outline-loop-transition';
	import Moon from '~icons/line-md/sunny-filled-loop-to-moon-filled-alt-loop-transition';
</script>

<ModeWatcher disableTransitions={false} />

<TooltipProvider>
	<div class="flex h-full flex-col px-5 pt-2">
		<header class="mb-4">
			{#if page.route.id === '/'}{:else}
				<nav class="float-left flex">
					<a class="mr-2 block text-2xl font-bold" href="/more/"
						>i<span class="text-red-600">HATE</span>WebP</a
					>
					<ul class="flex gap-3">
						<li>
							<Button variant="link" class="px-0 text-muted-foreground" href="/">Home</Button>
						</li>
						<li>
							<Button variant="link" class="px-0 text-muted-foreground" href="/about/">About</Button
							>
						</li>
						<li>
							<Button variant="link" class="px-0 text-muted-foreground" href="/contribute/"
								>Contribute</Button
							>
						</li>
					</ul>
				</nav>
			{/if}

			<nav class="float-right">
				<ul>
					<li>
						<Button variant="ghost" size="icon" onclick={toggleMode}>
							{#if $mode === 'light'}
								<Sun />
							{:else}
								<Moon />
							{/if}
						</Button>
					</li>
				</ul>
			</nav>
		</header>

		<main class="grow text-center" id="main">
			{@render children()}
		</main>

		<Footer />
	</div>
</TooltipProvider>
