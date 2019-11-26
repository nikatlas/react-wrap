import React from 'react';
import Wrapper from './index';

let CCCOUNTER = 1000;
export function resetCounter() {
	CCCOUNTER = 1000;
};
export default class RComponent extends React.Component{
	constructor(props) {
		super(props);
		this.__WrapperId = CCCOUNTER++;
		// this.props.__WrapperId = this.__WrapperId;
		this.rules = {};	
	}


	componentDidReceivedRules(rules) {
		console.log("RECEIVED RULES:", rules, this);
		let {
			style,
			...restRules
		} = rules;
		this.rules = restRules;

		this.forceUpdate();
	}
}