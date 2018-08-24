// Percentages used to dynamically set the text size
export const JAPANESE_CHAR_RATIO = 0.3;
export const ENGLISH_CHAR_RATIO = 0.2;
export const ONE_CHAR_RATIO = 0.5;
export const TWO_CHAR_RATIO = 0.47;
export const THREE_FOUR_CHAR_RATIO = 0.45;
export const DEFAULT_CHAR_RATIO = 0.4;

// letter spacing
export const JAPANESE_DEFAULT_KERNING = '0.05em';
export const JAPANESE_SINGLE_CHAR_KERNING = '-0.02em';

export const RING_SIZE_RATIO = 0.03;


export function isEnglish(text) {
	return /^[0-9a-zA-Z]+$/.test(text);
}

export function calculateRingSize(hankoSize) {
	return hankoSize * RING_SIZE_RATIO;
}

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

// dynamically set font size according to:
// 1. size of the hanko
// 2. length of nameText
// 3. detected language
export function calculateFontSize(props) {
	const {
		size,
		detectedLanguage,
		nameText
	} = props;

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
