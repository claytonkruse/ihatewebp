<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex h-full flex-col p-5 pb-0">
	<header>
		<nav class="float-left"><a class="text-2xl font-bold" href="/">Toolbox</a></nav>
		<nav class="float-right"><a href="https://claytonkruse.com/">CK</a></nav>
	</header>
	<main class="grow text-center" id="main">
		{@render children()}
	</main>
	<footer class="py-5 pt-8 text-center text-xs">
		Created by <a href="https://claytonkruse.com/">Clayton Kruse</a>
	</footer>
</div>
