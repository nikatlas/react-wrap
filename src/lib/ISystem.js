export default class ISystem {
	constructor() { 
		this.id = Math.random();
	}

	verbose() {
		this._verbose = true;
	}

	log(...args) {
		if(this._verbose)console.log(...args);
	}
}