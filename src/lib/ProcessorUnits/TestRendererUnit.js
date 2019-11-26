import React from 'react';
import Unit from '../Unit';

export default class TestRendererUnit extends Unit {
	constructor() {
		super();
		this.verbose();
	}

	run(args, renderer) {
		let [ctor, props, ...children] = args;
		
		let stamp = props.stamp;
		let childrenStamps;
		let rules = React.getRules(stamp);

		props.rules = rules;
		this.log("[-->] TestRendererUnit: ", stamp, rules);
		return args;
	}
} 