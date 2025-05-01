import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { formats } from '../formats';

export const load: PageLoad = ({ params }) => {
	for (const format of formats) {
		if (format.name.toLowerCase() === params.format) return { format };
		if (format.aliases && format.aliases.map((e) => e.toLowerCase()).includes(params.format))
			redirect(301, '../' + format.name.toLowerCase() + '/');
	}

	error(404, 'Not found');
};

import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
	const arr = [];
	for (const format of formats) {
		arr.push({ format: format.name.toLowerCase() });
		if (format.aliases)
			for (const alias of format.aliases) {
				arr.push({ format: alias.toLowerCase() });
			}
	}

	console.log(arr);

	return arr;
};

export const prerender = true;
