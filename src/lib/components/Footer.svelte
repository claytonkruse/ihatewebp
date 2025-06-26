<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Github from '~icons/akar-icons/github-fill';
</script>

<footer class="pt-8 text-center">
	<nav class="flex justify-between">
		<ul class="flex gap-4">
			<!-- <li>
				<Button variant="link" class="px-0 text-muted-foreground" href="/about/">About</Button>
			</li> -->
			<li>
				<Button variant="link" class="px-0 text-muted-foreground" href="/convert/">Convert</Button>
			</li>
			<li>
				<Button variant="link" class="px-0 text-muted-foreground" href="/flip/">Flip</Button>
			</li>
			<li>
				<Button variant="link" class="px-0 text-muted-foreground" href="/rotate/">Rotate</Button>
			</li>
			<li>
				<Button variant="link" class="px-0 text-muted-foreground" href="/letterbox/"
					>Letterbox</Button
				>
			</li>
			<li>
				<Button variant="link" class="px-0 text-muted-foreground" href="/rasterize/"
					>Rasterize</Button
				>
			</li>
			<li>
				<Button variant="link" class="px-0 text-muted-foreground" href="/compress/">Compress</Button
				>
			</li>
			<li>
				<Button variant="link" class="px-0 text-muted-foreground" href="/">More Tools</Button>
			</li>
		</ul>

		<ul class="flex gap-4 align-baseline">
			<li>
				<Button variant="link" class="px-0 text-muted-foreground" href="/about/"
					>About iHATEWebP</Button
				>
			</li>
			<li>
				<Button variant="link" class="px-0 text-muted-foreground" href="https://claytonkruse.com/"
					>Clayton Kruse</Button
				>
			</li>
			<!-- <li class="align-baseline"><Button variant="ghost" size="icon"><Github /></Button></li> -->
		</ul>
	</nav>
</footer>
