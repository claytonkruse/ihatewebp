import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

type format = {
	name: string;
	aliases?: Array<string>;
	ext?: string;
};

const formats: Array<format> = [
	{
		name: 'PNG'
	},
	{
		name: 'JPEG',
		aliases: ['JPG', 'JPE'],
		ext: 'jpg'
	},
	{
		name: 'WebP'
	},
	{
		name: 'AVIF'
	}
];

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
