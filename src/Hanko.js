import React, { Component } from 'react';
import { PropTypes } from 'prop-types';


const JAPANESE_MULTIPLIER = 0.3;
const ENGLISH_MULTIPLIER = 0.2;
const RING_WIDTH_MULTIPLER = 0.025;

class Hanko extends Component {

	state = { detectedLanguage: '' };

	static propTypes = {
		ringColor: PropTypes.string,
		ringWidth: PropTypes.number,
		children: PropTypes.string,
		className: PropTypes.string,
		color: PropTypes.string,
		rotation: PropTypes.number,
		size: PropTypes.objectOf(PropTypes.number),
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
		ringWidth: 0,
		rotation: 0,
		size: {
			height: 100,
			width: 100
		},
		style: {}
	};

	componentDidMount() {
		this.detectLanguage();
	}

	detectLanguage() {
		const { children, familyName } = this.props;

		const nameText = children || familyName;

		if (nameText && /^[0-9a-zA-Z]+$/.test(nameText)) {
			this.setState({ detectedLanguage: 'English' });
		} else if (nameText) {
			this.setState({ detectedLanguage: 'Japanese' });
		}
	}

	// dynamically set the width of the hanko ring
	getRingWidth() {
		const {
			ringWidth,
			size
		} = this.props;
		let updatedRingWidth;

		if (ringWidth) {
			return `${ringWidth}px`;
		}

		if (size) {
			const { height, width } = size;
			if (height && width) {
				updatedRingWidth = width * RING_WIDTH_MULTIPLER;
			}
		}

		return `${updatedRingWidth}px`;
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
			const { height, width } = size;
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

			if (height && width) {
				const nameLengthMultiplier = nameText.length * ratio;

				fontSize = detectedLanguage === 'English'
					? (width * ENGLISH_MULTIPLIER / (nameLengthMultiplier * 0.4))
					: (width * JAPANESE_MULTIPLIER) / nameLengthMultiplier;
			}
		}

		return `${fontSize}px`;
	}

	render() {
		const { detectedLanguage } = this.state;
		const {
			children,
			className,
			color,
			familyName,
			size: {
				width,
				height
			},
			orientation,
			ringColor,
			rotation
		} = this.props;

		const sizeStyle = {
			width: `${width}px`,
			height: `${height}px`
		};

		let letterSpacing = detectedLanguage === 'Japanese'
			? '0.05em'
			: '0';

		const nameText = children || familyName;

		if (nameText.length === 1
			&& detectedLanguage === 'Japanese') {
			letterSpacing = '-0.07em';
		}

		if (nameText.length > 4) {
			letterSpacing = '0';
		}

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

		return (
			<div
				className="hanko-container"
				style={sizeStyle}
			>
				<div
					className="hanko-circle"
					style={{
						borderColor: ringColor || color,
						borderWidth: this.getRingWidth(),
						transform: `rotate(${rotation}deg)`
					}}
				>
					<div className="hanko-content">
						<p
							className={className}
							style={{
								color,
								letterSpacing,
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
