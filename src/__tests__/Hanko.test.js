import React from 'react';
import { shallow } from 'enzyme';
import { Hanko } from '../Hanko';
import {
	JAPANESE_CHAR_RATIO,
	TWO_CHAR_RATIO
} from '../utils';


describe('Hanko', () => {
	let wrapper;
	let instance;
	let props;

	const matchDecimalNumbers = /^\d+(\.\d+)?/;

	beforeEach(() => {
		props = {
			children: '鈴木',
			className: '',
			color: '',
			containerStyle: {},
			familyName: '',
			orientation: '',
			rotation: 0,
			size: 100,
			textStyle: {},
			writingMode: ''
		};

		wrapper = shallow(<Hanko {...props} />);
		instance = wrapper.instance();
	});

	it('should render the component', () => {
		expect(wrapper).toHaveLength(1);
	});

	it('should throw an error if neither familyName nor children props provided', () => {
		let error;

		// override console.error so jest can recognize the failed prop types error.
		console.error = message => {
			throw new Error(message);
		};

		try {
			wrapper.setProps({ children: '' });
		}	catch (err) {
			error = err;
		}

		expect(error).toBeInstanceOf(Error);
	});

	it('should throw an error if size prop is not provided', () => {
		let error;

		// override console.error so jest can recognize the failed prop types error.
		console.error = message => {
			throw new Error(message);
		};

		try {
			wrapper.setProps({ size: null });
		}	catch (err) {
			error = err;
		}

		expect(error).toBeInstanceOf(Error);
	});

	it('should use either children or familyName prop for the hanko text', () => {
		expect(wrapper.find('p').text()).toEqual('鈴木');

		wrapper.setProps({
			children: '',
			familyName: 'Johnson'
		});

		expect(wrapper.find('p').text()).toEqual('Johnson');

		wrapper.setProps({
			familyName: '',
			children: '鈴木'
		});

		expect(wrapper.find('p').text()).not.toEqual('Johnson');
		expect(wrapper.find('p').text()).toEqual('鈴木');
	});

	it('should render text provided by children prop if both children and text props are provided', () => {
		wrapper.setProps({ familyName: 'Johnson' });

		expect(wrapper.find('p').text()).toEqual('鈴木');
	});

	it('should detect the language of the familyName or children prop as Japanese or English', () => {
		expect(wrapper.state('detectedLanguage')).toEqual('Japanese');

		wrapper.setProps({
			familyName: 'Johnson',
			children: ''
		});

		instance.detectLanguage();
		expect(wrapper.state('detectedLanguage')).toEqual('English');

		wrapper.setProps({ children: '8Robinson28', familyName: '' });
		instance.detectLanguage();
		expect(wrapper.state('detectedLanguage')).toEqual('English');

		wrapper.setProps({ familyName: '鈴木', children: '' });
		instance.detectLanguage();
		expect(wrapper.state('detectedLanguage')).toEqual('Japanese');
	});

	it('should dynamically set the text font size', () => {
		const { size } = props;

		const fontSizeInPx = instance.getFontSize();
		const fontSizeNumber = fontSizeInPx.match(matchDecimalNumbers)[0];
		const familyNameLength = instance.props.children.length;
		const nameLengthRatio = familyNameLength * TWO_CHAR_RATIO;
		const calculatedFontSize = (size * JAPANESE_CHAR_RATIO) / nameLengthRatio;

		expect(Number(calculatedFontSize)).toEqual(Number(fontSizeNumber));
	});

	it('should set the text font size according to the detected language', () => {
		const japaneseNameLength = instance.props.children.length;
		const japaneseFontSize = instance.getFontSize();

		wrapper.setProps({ children: 'Bo' });
		const englishNameLength = instance.props.children.length;
		const englishFontSize = instance.getFontSize();

		expect(japaneseNameLength).toEqual(englishNameLength);
		expect(englishFontSize).not.toEqual(japaneseFontSize);
	});

	it('should set the size of the hanko ring', () => {
		const ringSizeInPx = instance.getRingSize();
		const ringSizeNumber = Number(ringSizeInPx.match(matchDecimalNumbers)[0]);
		expect(ringSizeNumber).toEqual(3);

		wrapper.setProps({ ringSize: 10 });
		expect(instance.getRingSize()).toEqual(`${instance.props.ringSize}px`);
	});

	it('should set the text letter spacing according to language', () => {
		const japaneseLetterSpacing = instance.getLetterSpacing();

		wrapper.setProps({
			children: '',
			familyName: 'Li'
		});

		const englishLetterSpacing = instance.getLetterSpacing();
		expect(japaneseLetterSpacing).not.toEqual(englishLetterSpacing);
	});

	it('should set the text letter spacing according to text length', () => {
		const twoCharLetterSpacing = instance.getLetterSpacing();

		wrapper.setProps({ children: '堺' });

		const singleCharLetterSpacing = instance.getLetterSpacing();
		expect(twoCharLetterSpacing).not.toEqual(singleCharLetterSpacing);
	});

	it('should handle the visual orientation of the text according to detected language', () => {
		const japaneseWritingMode = instance.getTextOrientation();
		expect(japaneseWritingMode).toEqual('vertical-rl');

		wrapper.setProps({ children: 'Burger' });
		const englishWritingMode = instance.getTextOrientation();
		expect(japaneseWritingMode).not.toEqual(englishWritingMode);
	});

	it('should override default text orientation if orientation prop is provided', () => {
		const writingMode = instance.getTextOrientation();
		expect(writingMode).toEqual('vertical-rl');

		wrapper.setProps({ orientation: 'horizontal' });
		const horizontalMode = instance.getTextOrientation();
		expect(horizontalMode).toEqual('horizontal-tb');
	});
});
