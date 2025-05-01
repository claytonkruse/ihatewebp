<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';

	let {
		value = $bindable(1080),
		maxShown = 9000,
		maxEnabled = 9000
	}: { value: number; maxShown?: number; maxEnabled?: number } = $props();

	function P(r: number) {
		return {
			variant: (r === value ? 'default' : 'outline') as 'default' | 'outline',
			onclick: () => {
				value = r;
			},
			class: r > maxShown ? 'hidden' : undefined,
			diabled: r > maxEnabled
		};
	}
</script>

<div class="flex flex-col items-center gap-1">
	<div class="flex gap-1">
		<!-- Width Based => TODO: FIX -->
		<Button {...P(16)}>16</Button>
		<Button {...P(32)}>32</Button>
		<Button {...P(64)}>64</Button>
		<Button {...P(128)}>128</Button>
		<Button {...P(256)}>256</Button>
		<Button {...P(512)}>512</Button>
	</div>
	<div class="flex gap-1">
		<!-- Height Based -->
		<Button {...P(144)}>144</Button>
		<Button {...P(240)}>240</Button>
		<Button {...P(360)}>360</Button>
		<Button {...P(480)}>480</Button>
		<Button {...P(720)}>720</Button>
		<Button {...P(1080)}>1080</Button>
	</div>
	<div class="flex gap-1">
		<Button {...P(1440)}>1440</Button>
		<Button {...P(2160)}>2160</Button>
		<Button {...P(4320)}>4320</Button>
	</div>

	<div class="mt-2 flex gap-1">
		<Input type="number" name="res" id="res" bind:value {onchange} class="inline-block w-20" />
		<Tooltip.Root>
			<Tooltip.Trigger>px</Tooltip.Trigger>
			<Tooltip.Content>Vertical Pixels</Tooltip.Content>
		</Tooltip.Root>
	</div>
</div>
