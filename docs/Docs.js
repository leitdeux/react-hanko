import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Hanko } from '../src/Hanko';


class Docs extends Component {
	render() {
		return (
			<div>
				<Hanko
					rotation={0}
					color="hotpink"
					size={{
						height: 500,
						width: 500
					}}
				>
					鈴木
				</Hanko>
			</div>
		);
	}
}

export default hot(module)(Docs);
