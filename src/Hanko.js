import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export const JAPANESE_MULTIPLIER = 0.3;
export const ENGLISH_MULTIPLIER = 0.2;
export const RING_WIDTH_MULTIPLER = 0.03;

const matchEnglishAlphabetAndArabicNumerals = /^[0-9a-zA-Z]+$/;


class Hanko extends Component {

	state = { detectedLanguage: '' };

	static propTypes = {
		ringColor: PropTypes.string,
		ringSize: PropTypes.number,
		children: PropTypes.string,
		className: PropTypes.string,
		color: PropTypes.string,
		rotation: PropTypes.number,
		size: PropTypes.number,
		style: PropTypes.objectOf(PropTypes.string),
		familyName: PropTypes.string,
		orientation: PropTypes.string
	};

	static defaultProps = {
		children: '',
		className: '',
		color: '#DD4827',
		familyName: '',
		orientation: '',
		ringColor: '',
		ringSize: 0,
		rotation: 0,
		size: 100,
		style: {}
	};

	componentDidMount() {
		this.detectLanguage();
	}

	detectLanguage() {
		const { children, familyName } = this.props;

		const nameText = children || familyName;

		if (!nameText) {
			throw new Error('<Hanko /> requires either a familyName or children prop to render.');
		}

		if (nameText && matchEnglishAlphabetAndArabicNumerals.test(nameText)) {
			this.setState({ detectedLanguage: 'English' });
		} else if (nameText) {
			this.setState({ detectedLanguage: 'Japanese' });
		}
	}

	getTextOrientation() {
		const { detectedLanguage } = this.state;
		const { orientation } = this.props;
		let textOrientation;

		if (orientation) {
			textOrientation = orientation === 'horizontal'
				? 'horizontal-tb'
				: 'vertical-rl';
		} else {
			textOrientation = detectedLanguage === 'Japanese'
				? 'vertical-rl'
				: 'horizontal-tb';
		}

		return textOrientation;
	}

	getLetterSpacing() {
		const { detectedLanguage } = this.state;
		const {
			children,
			familyName
		} = this.props;

		let letterSpacing = detectedLanguage === 'Japanese'
			? '0.05em'
			: '0';

		const nameText = children || familyName;

		if (nameText.length === 1
			&& detectedLanguage === 'Japanese') {
			letterSpacing = '-0.02em';
		}

		if (nameText.length > 4) {
			letterSpacing = '0';
		}

		return letterSpacing;
	}

	// dynamically set the width of the hanko ring
	getRingSize() {
		const {
			ringSize,
			size
		} = this.props;
		let updateRingSize;

		if (ringSize) {
			return `${ringSize}px`;
		}

		if (size) {
			updateRingSize = size * RING_WIDTH_MULTIPLER;
		}

		return `${updateRingSize}px`;
	}

	// dynamically set familyName according to:
	// 1. size of the hanko container
	// 2. length of familyName
	// 3. detected language
	getFontSize() {
		const {
			children,
			size,
			familyName
		} = this.props;
		const { detectedLanguage } = this.state;
		let fontSize;

		if (size) {
			const nameText = familyName || children;
			let ratio;

			switch (nameText.length) {
				case 1:
					ratio = 0.5;
					break;
				case 2:
					ratio = 0.47;
					break;
				case 3:
					ratio = 0.45;
					break;
				case 4:
					ratio = 0.45;
					break;
				default:
					ratio = 0.4;
			}

			const nameLengthMultiplier = nameText.length * ratio;

			fontSize = detectedLanguage === 'English'
				? (size * ENGLISH_MULTIPLIER / (nameLengthMultiplier * 0.4))
				: (size * JAPANESE_MULTIPLIER) / nameLengthMultiplier;
		}

		return `${fontSize}px`;
	}

	render() {
		const {
			children,
			className,
			color,
			familyName,
			ringColor,
			rotation,
			size
		} = this.props;

		const textOrientation = this.getTextOrientation();

		const sizeStyle = {
			width: `${size}px`,
			height: `${size}px`
		};

		return (
			<div style={sizeStyle}>
				<div
					className="hanko-circle"
					style={{
						borderColor: ringColor || color,
						borderWidth: this.getRingSize(),
						transform: `rotate(${rotation}deg)`
					}}
				>
					<div className="hanko-content">
						<p
							className={className}
							style={{
								color,
								letterSpacing: this.getLetterSpacing(),
								msWritingMode: textOrientation,
								WebkitWritingMode: textOrientation,
								writingMode: textOrientation,
								fontSize: this.getFontSize(),
								fontWeight: 600,
								fontFamily: "'Hiragino Mincho ProN', 'MS PMincho', serif"
							}}
						>
							{children || familyName}
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Hanko;
export { Hanko };
