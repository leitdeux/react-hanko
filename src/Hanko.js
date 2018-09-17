import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
	calculateFontSize,
	calculateKerning,
	calculateRingSize,
	isEnglish
} from './utils';


/**
 * React class component visually representing a "hanko" (name stamp).
 * @extends {Component}
 */
class Hanko extends Component {

	state = { detectedLanguage: '' };

	static propTypes = {
		/**
		 * Hanko label text.
		 */
		children: PropTypes.string,

		/**
		 * CSS class used for custom styling of the hanko ring and text.
		 */
		className: PropTypes.string,

		/**
		 * Color of the hanko "ring" and text label
		 */
		color: PropTypes.string,

		/**
		 * Inline style object used for overriding styles of the parent container div.
		 */
		containerStyle: PropTypes.objectOf(PropTypes.string),

		/**
		 * Hanko label text (can be used instead of `children`).
		 */
		familyName(props, propName) {
			if ((props.children === '') && (props[propName] === '')) {
				return new Error(
					'Please provide either a familyName or children prop to render <Hanko />.'
				);
			}
		},

		/**
		 * Hanko label's text orientation.
		 */
		orientation: PropTypes.string,

		/**
		 * Color of the hanko 'ring'
		 */
		ringColor: PropTypes.string,

		/**
		 * Size of the hanko ring.
		 */
		ringSize: PropTypes.number,

		/**
		 * Rotation (transform) of the hanko text.
		 */
		rotation: PropTypes.number,

		/**
		 * Size (height and width are equal) of the hanko itself.
		 */
		size: PropTypes.number.isRequired,

		/**
		 * Custom style object used to override the default styling of the hanko text.
		 */
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

	/**
	 * Returns the font size (in pixels) of the hanko text label.
	 * @return {string}
	 */
	getFontSize = () => {
		const { detectedLanguage } = this.state;
		const {
			children,
			size,
			familyName
		} = this.props;

		const nameText = children || familyName;

		const fontSize = calculateFontSize({
			nameText,
			detectedLanguage,
			size
		});

		return `${fontSize}px`;
	}

	// dynamically set the size of the hanko ring
	/**
	 * Returns the size (in pixels) of the hanko ring.
	 * This value is used for both height and width of the ring.
	 * @return {string}
	 */
	getRingSize = () => {
		const {
			ringSize,
			size
		} = this.props;

		if (ringSize) {
			return `${ringSize}px`;
		}

		const updatedRingSize = calculateRingSize(size);

		return `${updatedRingSize}px`;
	}

	/**
	 * Returns the letter spacing (in em) to be used to style the hanko text label.
	 * @return {string}
	 */
	getLetterSpacing = () => {
		const { detectedLanguage } = this.state;
		const {
			children,
			familyName
		} = this.props;

		const nameText = children || familyName;

		return calculateKerning(nameText, detectedLanguage);
	}

	/**
	 * Returns the orientation of the hanko label text.
	 * Orientations may be horizontal or vertical.
	 * @return {string}
	 */
	getTextOrientation = () => {
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

	/**
	 * Identifies the language used in the hanko label text,
	 * recognizing it as either English or Japanese.
	 */
	detectLanguage = () => {
		const { children, familyName } = this.props;

		const nameText = children || familyName;

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

		if (!size || (!children && !familyName)) {
			return null;
		}

		const textOrientation = this.getTextOrientation();

		const hankoContainerStyle = {
			width: `${size}px`,
			height: `${size}px`,
			...containerStyle
		};

		const hankoCustomRingStyle = {
			borderColor: ringColor || color,
			borderWidth: this.getRingSize(),
			transform: `rotate(${rotation}deg)`
		};

		const hankoRingStyle = {
			display: 'flex',
			justifyContent: 'center',
			borderStyle: 'solid',
			borderRadius: '50%',
			height:'80%',
			width: '80%',
			...hankoCustomRingStyle
		};

		const hankoContentStyle = {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
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
					style={hankoRingStyle}
				>
					<div style={hankoContentStyle}>
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
