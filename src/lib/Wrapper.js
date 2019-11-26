import React from 'react';

import Core from './index';
export default class Wrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
		// Core.onFrame(() => {
		// 	console.log("FRAME");
		// 	this.forceUpdate();
		// });
	}

	performInjection() {
		 
	}

	render() {
		console.log("WRAPPER COMPONENT RENDER")
		// return this.props.children;
		return React.Children.map(this.props.children, (child) => {
			console.log("WRAPPER",child);
			return child;//React.cloneElement(child, {key:Math.random()});
		});
	}
}