import Unit from '../Unit';


export default class TestUnit extends Unit {
	constructor() {
		super();
		
	}

	run(args, renderer) {
		// console.log("[-->] TestUnit: ", args, renderer);
		let props = args[1];
		let id = props.____id;
		try {
			let item = renderer && renderer.root.findByProps(props);
			console.log("--->",item);
		}	catch(r) {
			console.log("---> ID ", id, renderer.root);

		}
		return args;
	}
} 