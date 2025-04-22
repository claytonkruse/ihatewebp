export function getImgFromUrl(url: URL | string): Promise<HTMLImageElement> {
	return new Promise((res, rej) => {
		const img = new Image();
		img.addEventListener('error', () => rej());
		img.addEventListener('load', () => res(img));

		img.src = new URL(url).href;
	});
}

export function getDataURLFromFile(file: File): Promise<string> {
	return new Promise((res, rej) => {
		const reader = new FileReader();
		reader.addEventListener('error', () => rej());
		reader.addEventListener('load', () => {
			res(reader.result as string);
		});
		reader.readAsDataURL(file);
	});
}

export async function rotate(oldURL: string): Promise<string> {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d')!;

	const img = await getImgFromUrl(oldURL);

	canvas.width = img.height;
	canvas.height = img.width;
	ctx.rotate(Math.PI / 2);
	ctx.translate(0, 0 - canvas.width);
	ctx.drawImage(img, 0, 0);

	const url = canvas.toDataURL('image/png');

	img.remove();
	canvas.remove();

	return url;
}

export function download(url: string, name: string) {
	const a = document.createElement('a');
	a.href = url;
	a.download = name;
	a.click();
	a.remove();
}
