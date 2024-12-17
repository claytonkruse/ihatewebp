import { error } from '@sveltejs/kit';
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
	for (const format of formats) if (format.name.toLowerCase() === params.format) return { format };

	error(404, 'Not found');
};
