[![Build Status](https://travis-ci.org/leitdeux/react-hanko.svg?branch=master)](https://travis-ci.org/leitdeux/react-hanko)
[![npm version](http://img.shields.io/npm/v/react-hanko.svg)](https://npmjs.org/package/react-hanko)

# react-hanko

A UI component to render Japanese *hanko*. Use it to add flair and realism to forms, digital contracts and signatures. 💮

> ##### han·ko
> *A Japanese stamp made of wood, stone, or horn, engraved with the name of an individual, office, or institution and used instead of a signature in official transactions.*
>
> [- The Free Dictionary](https://www.thefreedictionary.com/hanko)

## Features

- Japanese and English support
- Conveniently sets font size and other properties via a provided `size` prop.
- Customizable:
  - Text inside a hanko can have either a vertical or horizontal orientation
  - Text can be rotated left or right (e.g. -24 degrees)
  - The color of the text or the outer "ring" may be set separately
  - Adjust the width of the hanko "ring" (i.e. the outer circle)
  - Use your own custom inline styles to override the default CSS styling

## Getting Started

### Installation

You can install [react-hanko](https://www.npmjs.com/package/react-hanko) from [npm](https://www.npmjs.com).

```bash
$ npm install react-hanko
```

### Example

Here is a quick example to get you started.

```js
import React, { Component } from 'react';
import { Hanko } from 'react-hanko';

class MyComponent extends Component {
  render() {
    return (
      <Hanko
        familyName="鈴木"
        size={100}
      />
    );
  }
}
```

## Props

These are the available properties to customize `react-hanko`.

**Important**: the `size` prop is required, as well as text provided either by `familyName` or `children`.

| Property              | Type                                                        | Default                          | Description                                                                                                                             |
|:----------------------|:------------------------------------------------------------|:---------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------|
| `children`            | `PropTypes.string`                                          | `''`                             | Text used for hanko label, written either in Japanese or English characters.                                                            |
| `className`           | `PropTypes.string`                                          | `''`                             | CSS class used for custom styling of the hanko ring and text.                                                                           |
| `color`               | `PropTypes.string`                                          | `#DD4827`                        | Color of the hanko "ring" and text label                                                                                                |
| `containerStyle`      | `PropTypes.objectOf(PropTypes.string)`                      | `{}`                             | Inline style object used for overriding styles of the parent container div.                                                             |
| `familyName`          | `PropTypes.string`                                          | `''`                             | Text of the hanko label (can be used instead of `children`).                                                                            |
| `orientation`         | `PropTypes.string`                                          | `''`                             | Hanko label's text orientation.                                                                                                         |
| `ringColor`           | `PropTypes.string`                                          | `''`                             | Color of the hanko 'ring'                                                                                                               |
| `ringSize`            | `PropTypes.number`                                          | `0`                              | Size of the hanko ring.                                                                                                                 |
| `rotation`            | `PropTypes.number`                                          | `0`                              | Rotation (transform) of the hanko text.                                                                                                 |
| `size`                | `PropTypes.number.isRequired`                               | `undefined`                      | Size (height and width are equal) of the hanko itself.                                                                                  |
| `textStyle`           | `PropTypes.objectOf(PropTypes.string)`                      | `{}`                             | Custom style object used to override the default styling of the hanko text.                                                             |

## ChangeLog

See [CHANGELOG.md](https://github.com/leitdeux/react-hanko/blob/master/CHANGELOG.md)

## Contribution
Thanks for checking out **react-hanko**.
Bugs, feature requests and comments are more than welcome in the [issues](https://github.com/leitdeux/react-hanko/issues).

**Before opening a PR:**

Run `npm test` after making changes, provide documentation and please be mindful of the code style.

Thanks!
