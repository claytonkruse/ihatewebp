import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
	return {
		w: BigInt(url.searchParams.get('w') ?? 0) || undefined,
		h: BigInt(url.searchParams.get('h') ?? 0) || undefined
	};
}) satisfies PageLoad;
