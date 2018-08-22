import React from 'react';
import { shallow } from 'enzyme';
import {
	Hanko,
	JAPANESE_MULTIPLIER,
	ENGLISH_MULTIPLIER,
	RING_WIDTH_MULTIPLIER
} from '../Hanko';

const MATCH_DECIMAL_NUMBERS = /^\d+(\.\d+)?/;


describe('Hanko', () => {
	let wrapper;
	let props;

	beforeEach(() => {
		props = {
			familyName: '',
			children: '',
			className: '',
			color: '',
			rotation: 0,
			size: 100,
			style: {},
			writingMode: ''
		};

		wrapper = shallow(<Hanko {...props} />);
	});

	it('should render the component', () => {
		expect(wrapper).toHaveLength(1);
	});

	it('should handle a children or familyName prop for the hanko text', () => {
		expect(wrapper.find('p').text()).toEqual('');

		wrapper.setProps({ familyName: 'Johnson' });
		expect(wrapper.find('p').text()).toEqual('Johnson');

		wrapper.setProps({
			familyName: '',
			children: '鈴木'
		});

		expect(wrapper.find('p').text()).not.toEqual('Johnson');
		expect(wrapper.find('p').text()).toEqual('鈴木');
	});

	it('should render text provided by children prop if both children and text props are provided', () => {
		wrapper.setProps({
			familyName: 'Johnson',
			children: '鈴木'
		});

		expect(wrapper.find('p').text()).toEqual('鈴木');
	});

	it('should detect the language used as Japanese or English', () => {
		expect(wrapper.state('detectedLanguage')).toEqual('');

		wrapper.setProps({ familyName: 'Johnson' });
		wrapper.instance().detectLanguage();
		expect(wrapper.state('detectedLanguage')).toEqual('English');

		wrapper.setProps({ children: '8Robinson28', familyName: '' });
		wrapper.instance().detectLanguage();
		expect(wrapper.state('detectedLanguage')).toEqual('English');

		wrapper.setProps({ familyName: '鈴木', children: '' });
		wrapper.instance().detectLanguage();
		expect(wrapper.state('detectedLanguage')).toEqual('Japanese');
	});

	it('should dynamically set the text font size', () => {
		const { size } = props;

		wrapper.setProps({ familyName: '鈴木' });

		const instance = wrapper.instance();
		const fontSizeInPx = instance.getFontSize();
		const fontSizeNumber = fontSizeInPx.match(MATCH_DECIMAL_NUMBERS)[0];
		const familyNameLength = instance.props.familyName.length;
		const nameLengthMultiplier = familyNameLength * 0.47;
		const calculatedFontSize = (size * JAPANESE_MULTIPLIER) / nameLengthMultiplier;

		expect(Number(calculatedFontSize)).toEqual(Number(fontSizeNumber));
	});

	it('should set the text font size differently according to the detected language', () => {
		// TODO
	});

	it('should dynamically set the size of the hanko ring', () => {
		const { size } = props;

		wrapper.setProps({ familyName: '鈴木' });

		const instance = wrapper.instance();
		const ringSizeInPx = instance.getRingSize();
		const ringSizeNumber = ringSizeInPx.match(MATCH_DECIMAL_NUMBERS)[0];

		// TODO
	});

	it('should handle the text letter spacing');
	it('should handle the visual orientation of the text');
	it('should handle a provided className prop');
	it('should handle a provided ringSize');
	it('should handle a provided size prop');
	it('should handle a provided color prop');
	it('should handle a provided ringColor prop');
	it('should handle a provided rotation prop');
	it('should handle a provided style prop');
});
