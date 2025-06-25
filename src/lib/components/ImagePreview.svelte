<script lang="ts">
	let { src }: { src?: string } = $props();
</script>

{#if src}
	<div class="checkerboard m-auto flex w-max outline-dotted outline-1">
		<img {src} alt="Preview" class="m-auto h-64" />
	</div>
{:else}
	<div class="m-auto flex h-48 w-48 animate-pulse items-center justify-center bg-secondary">
		Loading...
	</div>
{/if}

<style>
	.checkerboard {
		background: repeating-conic-gradient(#5050501b 0% 25%, transparent 0% 50%) 50% / 20px 20px;
	}
</style>
