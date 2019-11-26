import ISystem from './ISystem';
import Injector from './Injector';
import Unit from './Unit';

class Processor extends ISystem {
	constructor() {
		super();
		this.units = [];
		this.counter = 1;
	}
	
	addUnit(unit) {
		if(!unit instanceof Unit)
			throw new Error("Only units here");
		this.units.push(unit);
	}

	manipulate(args, renderer) {
		let type = args[0],
			props = args[1],
			children = args[2];
		if(!props.____id) {
			props.____id = this.counter++;
		}
		let results = this.units.reduce((res, unit) => unit.run(res, renderer), args)
		this.log(results, args);
		return results;
	}

}

export default new Processor();