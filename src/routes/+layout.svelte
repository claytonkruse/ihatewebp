<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex h-full flex-col p-5 pb-0">
	<header class="mb-4">
		<nav class="float-left flex">
			<a class="mr-2 block text-2xl font-bold" href="/">Toolbox</a>
			<ul class="flex gap-2">
				<li><Button variant="link" class="px-0" href="/about/">About</Button></li>
				<li><Button variant="link" class="px-0" href="/support/">Support</Button></li>
			</ul>
		</nav>
		<nav class="float-right"><a href="https://claytonkruse.com/">CK</a></nav>
	</header>
	<main class="grow text-center" id="main">
		{@render children()}
	</main>
	<footer class="py-5 pt-8 text-center text-xs">
		Created by <a href="https://claytonkruse.com/">Clayton Kruse</a>
	</footer>
</div>
