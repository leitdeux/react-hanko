import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
	calculateFontSize,
	calculateKerning,
	calculateRingSize,
	isEnglish
} from './utils';


class Hanko extends Component {

	state = { detectedLanguage: '' };

	static propTypes = {
		children: PropTypes.string,
		className: PropTypes.string,
		color: PropTypes.string,
		containerStyle: PropTypes.objectOf(PropTypes.string),
		familyName: PropTypes.string,
		orientation: PropTypes.string,
		ringColor: PropTypes.string,
		ringSize: PropTypes.number,
		rotation: PropTypes.number,
		size: PropTypes.number,
		textStyle: PropTypes.objectOf(PropTypes.string)
	};

	static defaultProps = {
		children: '',
		className: '',
		color: '#DD4827',
		containerStyle: {},
		familyName: '',
		orientation: '',
		ringColor: '',
		ringSize: 0,
		rotation: 0,
		size: 100,
		textStyle: {}
	};

	componentDidMount() {
		this.detectLanguage();
	}

	componentDidUpdate(prevProps) {
		const {
			children,
			familyName
		} = this.props;

		if ((prevProps.familyName !== familyName)
			|| (prevProps.children !== children)) {
			this.detectLanguage();
		}
	}

	// dynamically set familyName according to:
	// 1. size of the hanko container
	// 2. length of familyName
	// 3. detected language
	getFontSize() {
		const { detectedLanguage } = this.state;
		const {
			children,
			size,
			familyName
		} = this.props;

		let fontSize;

		if (size) {
			const nameText = familyName || children;

			fontSize = calculateFontSize({
				nameText,
				detectedLanguage,
				size
			});
		}

		return `${fontSize}px`;
	}

	// dynamically set the size of the hanko ring
	getRingSize() {
		const {
			ringSize,
			size
		} = this.props;

		let updatedRingSize;

		if (ringSize) {
			return `${ringSize}px`;
		}

		if (size) {
			updatedRingSize = calculateRingSize(size);
		}

		return `${updatedRingSize}px`;
	}

	getLetterSpacing() {
		const { detectedLanguage } = this.state;
		const {
			children,
			familyName
		} = this.props;

		const nameText = children || familyName;

		return calculateKerning(nameText, detectedLanguage);
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

	detectLanguage() {
		const { children, familyName } = this.props;

		const nameText = children || familyName;

		if (!nameText) {
			throw new Error('<Hanko /> requires either a familyName or children prop to render.');
		}

		if (nameText && isEnglish(nameText)) {
			this.setState({ detectedLanguage: 'English' });
		} else {
			this.setState({ detectedLanguage: 'Japanese' });
		}
	}

	render() {
		const {
			children,
			className,
			color,
			containerStyle,
			familyName,
			ringColor,
			rotation,
			size,
			textStyle
		} = this.props;

		const textOrientation = this.getTextOrientation();

		const hankoContainerStyle = {
			width: `${size}px`,
			height: `${size}px`,
			...containerStyle
		};

		const hankoRingStyle = {
			borderColor: ringColor || color,
			borderWidth: this.getRingSize(),
			transform: `rotate(${rotation}deg)`
		};

		const hankoTextStyle = {
			color,
			fontFamily: "'Hiragino Mincho ProN', 'MS PMincho', serif",
			fontSize: this.getFontSize(),
			fontWeight: 600,
			letterSpacing: this.getLetterSpacing(),
			msWritingMode: textOrientation,
			WebkitWritingMode: textOrientation,
			writingMode: textOrientation,
			...textStyle
		};

		return (
			<div style={hankoContainerStyle}>
				<div
					className="hanko-circle"
					style={hankoRingStyle}
				>
					<div className="hanko-content">
						<p
							className={className}
							style={hankoTextStyle}
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
