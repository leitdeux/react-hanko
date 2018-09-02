import React, { Component } from 'react';

import ExampleContractContainer from './containers/ExampleContractContainer';

/**
 * Renders an example employee contract with name fields for signature and a hanko
 * which appears when both fields are provided.
 */
class App extends Component {
	render() {
		return (
			<div>
				<ExampleContractContainer />
			</div>
		);
	}
}

export default App;
