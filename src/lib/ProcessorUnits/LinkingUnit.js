import Unit from '../Unit';


export default class LinkingUnit extends Unit {
	constructor() {
		super();
		// this.verbose();
		this.tree = [];
	}

	onReset() {
		this.tree = [];
	}

	addNode(stamp, childrenStamps) {
		this.tree.push({
			stamp,
			childrenStamps
		});
	}

	run(args, renderer) {
		let [ctor, props, ...children] = args;
		
		let stamp = props.stamp;
		let childrenStamps;
		try{
			childrenStamps = children.reduce((stamps, c) => {
				return c && c.props && stamps.push(c.props.stamp) && stamps || stamps;
			}, []);
		} catch(e) {
			debugger;
		}

		this.addNode(stamp, childrenStamps);

		this.log("[-->] LinkingUnit: ", this.tree, stamp, childrenStamps, args);
		return args;
	}
} 