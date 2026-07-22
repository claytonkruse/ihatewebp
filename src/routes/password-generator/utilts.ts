export function generatePassword(
	length = 16,
	charpool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~|}{[]:;?><,./-='
) {
	if (!(length > 0 && charpool)) return '';
	const charset = [...new Set(charpool)].join('');
	const charsetLength = charset.length;

	// Calculate the maximum valid value to avoid modulo bias
	const maxValidValue = 256 - (256 % charsetLength);

	let password = '';
	const singleByteArray = new Uint8Array(1);

	while (password.length < length) {
		crypto.getRandomValues(singleByteArray);
		const randomValue = singleByteArray[0];

		// Reject values that would cause bias
		if (randomValue < maxValidValue) {
			password += charset.charAt(randomValue % charsetLength);
		}
	}

	return password;
}
