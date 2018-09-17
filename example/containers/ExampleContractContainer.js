import React, { Component } from 'react';
import ExampleContractForm from '../components/ExampleContractForm';

/**
 * Example employee contract text from {@link http://www.lawiz.net/template/template/029.html}
 */
class ExampleContractContainer extends Component {

	state = {
		familyName: '鈴木',
		givenName: '太郎',
		representativeName: 'ロイズ',
		shouldShowHanko: false
	};

	componentDidMount() {
		const {
			familyName,
			givenName
		} = this.state;

		if (familyName && givenName) {
			this.setState({ shouldShowHanko: true });
		}
	}

	handleNameInput = (state, value) => {
		if (state === 'familyName') {
			this.setState({ familyName: value, shouldShowHanko: false });
		} else {
			this.setState({ givenName: value });
		}
	};

	handleInputBlur = () => {
		const { familyName, givenName } = this.state;

		// show hanko only if both name fields have values
		if (familyName && givenName) {
			return this.setState({ shouldShowHanko: true });
		}

		this.setState({ shouldShowHanko: false });
	};

	renderContractFormText = () => {
		return (
			<div className="contract-content">
				<h4 className="contract-center-text">入社誓約書</h4>
				<p>　私、鈴木太郎　は、貴社に採用されたことにつき、上職の指揮に従い業務に精励し、下記事項を堅く守ります。万一これに反して御社にご迷惑・ご損害をかけました節はその責めに任じますことをここに誓約します。</p>
				<p>１　諸規則・規程等を遵守し、信義誠実を旨として勤務します</p>
				<p>２　業務上の機密に属することは在職中はもちろん、退職後もこれを他に漏洩しません</p>
				<p>３　社の内外を問わず従業員の面目を傷つけ、御社の名誉を汚損する言動はしません</p>
				<p>４　○○○○</p>
				<p>　　　平成○○年○○月○○日</p>
				{this.renderContractFormInputs()}
			</div>
		);
	}

	renderContractFormInputs = () => {
		const {
			familyName,
			givenName,
			representativeName,
			shouldShowHanko
		} = this.state;

		return (
			<ExampleContractForm
				familyName={familyName}
				givenName={givenName}
				onBlur={this.handleInputBlur}
				onChange={this.handleNameInput}
				representativeName={representativeName}
				shouldShowHanko={shouldShowHanko}
			/>
		);
	}

	render() {
		return (
			<div className="contract-container">
				{this.renderContractFormText()}
			</div>
		);
	}
}

export default ExampleContractContainer;
