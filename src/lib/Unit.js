export default class Unit {
	constructor(id) {
		this.id = id || Math.random();
		this.runner = this.run;
	}

	verbose() {
		this._verbose = true;
	}

	log(...args) {
		if(this._verbose) console.log(...args);
	}

	run(args) {
		throw new Error("Override me plz!");
	}


}