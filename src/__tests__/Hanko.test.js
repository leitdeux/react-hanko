import React from 'react';
import { shallow } from 'enzyme';
import { Hanko } from '../Hanko';


describe('Hanko', () => {
	let wrapper;
	let props;

	beforeEach(() => {
		props = {
			text: '',
			children: '',
			className: '',
			color: '',
			rotation: 0,
			style: {},
			writingMode: ''
		};

		wrapper = shallow(<Hanko {...props} />);
	});

	it('should render the component', () => {
		expect(wrapper).toHaveLength(1);
	});

	it('should detect text as either English or Japanese', () => {
		expect(wrapper.state('detectedLanguage')).toEqual('');

		wrapper.setProps({ text: 'Johnson' });
		wrapper.instance().detectLanguage();
		expect(wrapper.state('detectedLanguage')).toEqual('English');

		wrapper.setProps({ children: '8Robinson28', text: '' });
		wrapper.instance().detectLanguage();
		expect(wrapper.state('detectedLanguage')).toEqual('English');

		wrapper.setProps({ text: '鈴木', children: '' });
		wrapper.instance().detectLanguage();
		expect(wrapper.state('detectedLanguage')).toEqual('Japanese');
	});
});
