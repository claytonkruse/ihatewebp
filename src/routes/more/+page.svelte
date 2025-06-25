<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
</script>

<svelte:head>
	<title>iHATEWebP Toolbox - More Tools</title>
</svelte:head>

<h1 class="text-4xl font-bold">i<span class="text-red-600">HATE</span>WebP Toolbox</h1>

<br />
<div class="m-auto max-w-2xl text-center">
	<h3 class="text-xl font-bold">Convert Images</h3>
	<nav>
		<ul class="flex flex-wrap justify-center gap-1">
			<li><Button variant="outline" href="/convert/png/">To PNG</Button></li>
			<li><Button variant="outline" href="/convert/jpeg/">To JPEG</Button></li>
			<li><Button variant="outline" href="/convert/webp/">To WebP</Button></li>
			<li><Button variant="outline" href="/convert/avif/">To AVIF</Button></li>
			<li>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button variant="outline" href="/rasterize/">SVG to PNG</Button>
					</Tooltip.Trigger>

					<Tooltip.Content>Rasterize SVG</Tooltip.Content>
				</Tooltip.Root>
			</li>
		</ul>
		<!-- <ul>
			<li>
				<Button variant="link" class="text-muted-foreground" href="/convert/"
					>All Image Converters</Button
				>
			</li>
		</ul> -->
	</nav>

	<br />
	<h3 class="text-lg font-bold">Edit Images</h3>
	<nav>
		<ul class="flex flex-wrap justify-center gap-1">
			<li><Button variant="outline" href="/flip/">Flip Tool</Button></li>
			<li><Button variant="outline" href="/rotate/">Rotate Tool</Button></li>
			<!-- <li><Button variant="default" href="/caption/">Add Caption</Button></li> -->
			<!-- <li><Button variant="default" href="/round/">Image Rounder</Button></li> -->
			<li>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button variant="outline" href="/letterbox/?w=1&h=1">Square Image Gen</Button>
					</Tooltip.Trigger>

					<Tooltip.Content>Letterbox 1:1</Tooltip.Content>
				</Tooltip.Root>
			</li>
			<li>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button variant="outline" href="/letterbox/">Letterboxing Tool</Button>
					</Tooltip.Trigger>

					<Tooltip.Content>Change Aspect Ratio</Tooltip.Content>
				</Tooltip.Root>
			</li>
			<li><Button variant="outline" href="/replace-transparency/">Replace Transparency</Button></li>
			<li>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button variant="outline" href="/rasterize/">Rasterize SVG</Button>
					</Tooltip.Trigger>

					<Tooltip.Content>SVG to PNG</Tooltip.Content>
				</Tooltip.Root>
			</li>
			<li><Button variant="outline" href="/compress/">Compress Image</Button></li>
		</ul>
	</nav>

	<!-- <br />
	<h3 class="text-lg font-bold">General Utilities</h3>
	<ul>
		<li><Button variant="default" href="/zip/">File Zipper</Button></li>
	</ul> -->

	<!-- <br /><br />
	<h3 class="mb-0 text-lg font-bold">External Tools (not associated with iHATEWebP)</h3>
	<nav>
		<ul>
			<li>
				<Button
					variant="link"
					rel="nofollow noopener"
					target="_blank"
					class="h-auto p-0 text-muted-foreground"
					href="https://favicon.io/favicon-generator/">Simple Favicon Maker</Button
				>
			</li>
			<li>
				<Button
					variant="link"
					rel="nofollow noopener"
					target="_blank"
					class="h-auto py-0 text-muted-foreground"
					href="https://svgl.app/">svgl</Button
				>
			</li>
		</ul>
	</nav> -->
</div>
