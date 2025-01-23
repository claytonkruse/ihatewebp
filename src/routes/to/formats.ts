export type format = {
	name: string;
	aliases?: Array<string>;
	ext?: string;
};

export const formats: Array<format> = [
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
