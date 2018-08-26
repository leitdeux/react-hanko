/**
 * Percentages used when calculating the font size of the label text.
 * @constant
 * @type {number}
 */
export const JAPANESE_CHAR_RATIO = 0.3;
export const ENGLISH_CHAR_RATIO = 0.2;
export const ONE_CHAR_RATIO = 0.5;
export const TWO_CHAR_RATIO = 0.47;
export const THREE_FOUR_CHAR_RATIO = 0.45;
export const DEFAULT_CHAR_RATIO = 0.4;

/**
 * Letter spacing values used when setting the kerning of the hanko text.
 * @constant
 * @type {string}
 */
export const JAPANESE_DEFAULT_KERNING = '0.05em';
export const JAPANESE_SINGLE_CHAR_KERNING = '-0.02em';

/**
 * Percentage used when calculating the size of the hanko ring.
 * @type {number}
 */
export const RING_SIZE_RATIO = 0.03;

/**
 * Detect whether the provided text is English or not.
 * @param  {string} text - The hanko label text's value.
 * @return {boolean}
 */
export function isEnglish(text) {
	return /^[0-9a-zA-Z]+$/.test(text);
}

/**
 * Get the hanko ring's thickness.
 * @param  {number} hankoSize - The hanko's height or width, in pixels.
 * @return {number}
 */
export function calculateRingSize(hankoSize) {
	return hankoSize * RING_SIZE_RATIO;
}

/**
 * Get the letter spacing for the hanko text label,
 * according to the language and length of the string.
 * @param  {string} text - The hanko's text value.
 * @param  {string} language - The
 * @return {string}
 */
export function calculateKerning(text, language) {
	let letterSpacing = language === 'Japanese'
		? JAPANESE_DEFAULT_KERNING
		: '0';

	if (language === 'Japanese') {
		if (text.length === 1) {
			letterSpacing = JAPANESE_SINGLE_CHAR_KERNING;
		} else if (text.length > 4) {
			letterSpacing = '0';
		}
	}

	return letterSpacing;
}

/**
 * Returns the font size of the hanko label text, according to the size of
 * the hanko, the length of the label text, and the detected language of the label text.
 * @param {Object} hankoProps - The properties of the hanko.
 * @param {number} hankoProps.size - The hanko's width or height value.
 * @param {string} hankoProps.detectedLanguage - The language used in the hanko label text.
 * @param {string} hankoProps.nameText - The hanko label text value.
 * @return {number}
 */
export function calculateFontSize(hankoProps) {
	const {
		size,
		detectedLanguage,
		nameText
	} = hankoProps;

	let ratio;

	switch (nameText.length) {
		case 1:
			ratio = ONE_CHAR_RATIO;
			break;
		case 2:
			ratio = TWO_CHAR_RATIO;
			break;
		case 3:
			ratio = THREE_FOUR_CHAR_RATIO;
			break;
		case 4:
			ratio = THREE_FOUR_CHAR_RATIO;
			break;
		default:
			ratio = DEFAULT_CHAR_RATIO;
	}

	const nameLengthMultiplier = nameText.length * ratio;

	return detectedLanguage === 'English'
		? (size * ENGLISH_CHAR_RATIO / (nameLengthMultiplier * DEFAULT_CHAR_RATIO))
		: (size * JAPANESE_CHAR_RATIO) / nameLengthMultiplier;
}
