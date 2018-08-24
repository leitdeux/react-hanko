import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Hanko } from '../src/Hanko';


class Docs extends Component {
	render() {
		return (
			<div>
				<Hanko
					familyName="鈴木"
					size={500}
				/>
			</div>
		);
	}
}

export default hot(module)(Docs);
