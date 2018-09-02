import React from 'react';
import { Hanko } from '../../src/Hanko';

const HANKO_SIZE = 75;


const ExampleContractForm = props => {
	const {
		familyName,
		givenName,
		representativeName,
		shouldShowHanko,
		onBlur,
		onChange
	} = props;

	let signerHanko;
	let representativeHanko;

	if (shouldShowHanko) {
		signerHanko = (
			<div className="hanko-container">
				<div className="hanko-content">
					<Hanko
						familyName={familyName}
						size={HANKO_SIZE}
					/>
				</div>
			</div>
		);

		representativeHanko = (
			<div className="hanko-container">
				<div className="hanko-content">
					<Hanko
						familyName={representativeName}
						size={HANKO_SIZE}
					/>
				</div>
			</div>
		);
	}

	const familyNameInput = (
		<div>
			<input
				value={familyName}
				onChange={({ target: { value } }) => onChange('familyName', value)}
				onBlur={onBlur}
				placeholder="姓"
			/>
		</div>
	);

	const givenNameInput = (
		<div style={{ paddingLeft: 8 }}>
			<input
				value={givenName}
				onChange={({ target: { value } }) => onChange('givenName', value)}
				onBlur={onBlur}
				placeholder="名"
			/>
		</div>
	);

	return (
		<div>
			<div className="contract-center-div">
				<div>
					住所　東京都○○区○
					<br />
					<div style={{ display: 'flex' }}>
						<span style={{ marginTop: 8, paddingRight: 16 }}>氏名</span>
						<div style={{ display: 'flex' }}>
							{familyNameInput}
							{givenNameInput}
						</div>
						{signerHanko}
					</div>
				</div>
			</div>
			<br />
			<br />
			<div className="contract-company-representative">
				　　株式会社　ロイズ
				<br />
				<div style={{ display: 'flex' }}>
		  	　　代表取締役　ロイズ太郎　殿 {representativeHanko}
		  	</div>
			</div>
		</div>
	);
};

export default ExampleContractForm;
