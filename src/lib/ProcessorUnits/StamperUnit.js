import React from 'react';
import Unit from '../Unit';
import hash from 'object-hash';

export class Counter {
	constructor(seed) {
		this.v = seed;
		this.seed = seed;
	}
	getNext() {
		return this.v++;
	}
	reset() {
		this.v = this.seed;
	}
}

export default class StamperUnit extends Unit {
	constructor() {
		super();
		this.verbose();
		this.counter = new Counter(100);
	}

	reset() {
		console.log("STAMPER RESET COUNTER", this.counter);
		this.counter && this.counter.reset();
	}

	run(args, renderer) {
		let [ctor, props, ...children] = args;
		// let childrenStamps = children.map((child) => child.props.stamp);
		// give stamp
		props.stamp = this.counter.getNext();
		// raise counter
		this.log("[-->] StamperUnit: ", ctor, children);
		return args;
	}
} 