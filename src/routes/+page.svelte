<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<svelte:head>
	<title>Toolbox - Convert Unlimited Images</title>
</svelte:head>

<hgroup class="mb-6">
	<h1 class="text-4xl">Clay's Toolbox</h1>
	<h2 class="text-muted-foreground">Convert Unlimited Images for Free</h2>
</hgroup>

<div class="m-auto text-center">
	<h3 class="text-xl font-bold">Convert Images</h3>
	<nav>
		<ul class="flex justify-center gap-1">
			<li><Button variant="outline" href="/to/png/">To PNG</Button></li>
			<li><Button variant="outline" href="/to/jpeg/">To JPEG</Button></li>
			<li><Button variant="outline" href="/to/webp/">To WebP</Button></li>
			<li><Button variant="outline" href="/to/avif/">To AVIF</Button></li>
		</ul>
		<ul>
			<li>
				<Button variant="link" class="text-muted-foreground" href="to">All Image Converters</Button>
			</li>
		</ul>
	</nav>

	<br />
	<h3 class="text-lg font-bold">Edit Images</h3>
	<nav>
		<ul class="flex justify-center gap-1">
			<li><Button variant="outline" href="/rotate/">Rotate Tool</Button></li>
			<!-- <li><Button variant="outline" href="/aspect-ratio/">Aspect Ratio Tool</Button></li> -->
		</ul>
	</nav>

	<br /><br />
	<h3 class="text-lg font-bold">External Tools</h3>
	<nav>
		<ul>
			<li>
				<Button
					variant="link"
					rel="nofollow noopener"
					target="_blank"
					href="https://favicon.io/favicon-generator/">Simple Favicon Maker</Button
				>
			</li>
		</ul>
	</nav>
</div>
