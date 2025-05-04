export function createImgFromURL(url: URL | string): Promise<HTMLImageElement> {
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

export async function createImgFromFile(file: File) {
	return await createImgFromURL(await getDataURLFromFile(file));
}

export async function createImg(old: string | File) {
	if (old instanceof File) {
		return await createImgFromFile(old);
	} else {
		return await createImgFromURL(old);
	}
}

export function save(url: string, name: string) {
	const a = document.createElement('a');
	a.href = url;
	a.download = name;
	a.click();
	a.remove();
}

export async function flipYaw(oldURL: string): Promise<string> {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d')!;
	const img = await createImgFromURL(oldURL);

	canvas.width = img.width;
	canvas.height = img.height;

	ctx.translate(canvas.width, 0);
	ctx.scale(-1, 1);
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

	const url = canvas.toDataURL('image/png');

	img.remove();
	canvas.remove();

	return url;
}

export async function flipPitch(oldURL: string): Promise<string> {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d')!;
	const img = await createImgFromURL(oldURL);

	canvas.width = img.width;
	canvas.height = img.height;

	ctx.translate(0, canvas.height);
	ctx.scale(1, -1);
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

	const url = canvas.toDataURL('image/png');

	img.remove();
	canvas.remove();

	return url;
}

export async function rotate(oldURL: string): Promise<string> {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d')!;

	const img = await createImgFromURL(oldURL);

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

export async function rmTransparency(old: string | File, bgColor: string = '#000') {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d')!;

	const img = await createImg(old);

	canvas.width = img.width;
	canvas.height = img.height;

	// Set background color
	ctx.fillStyle = bgColor;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.drawImage(img, 0, 0);

	const url = canvas.toDataURL('image/jpeg');

	img.remove();
	canvas.remove();

	return url;
}

// Scale Vertically
export async function scaleV(
	old?: string | File,
	height: number = 1080,
	bgColor: string = '#00000000',
	fmt: string = 'png'
) {
	if (!old) return '';
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d')!;

	const img = await createImg(old);

	canvas.width = (height / img.height) * img.width;
	canvas.height = height;

	// Set background color
	ctx.fillStyle = bgColor;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

	const url = canvas.toDataURL('image/' + fmt);

	img.remove();
	canvas.remove();

	return url;
}

export async function letterbox(oldURL: string, ratio: number, color: string = '#000') {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d')!;

	const img = await createImgFromURL(oldURL);

	if (img.width / img.height > ratio) {
		canvas.width = img.width;
		canvas.height = img.width / ratio;
	} else {
		canvas.width = img.height * ratio;
		canvas.height = img.height;
	}

	// Set background color
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.drawImage(img, (canvas.width - img.width) / 2, (canvas.height - img.height) / 2);

	const url = canvas.toDataURL('image/png');

	img.remove();
	canvas.remove();

	return url;
}
