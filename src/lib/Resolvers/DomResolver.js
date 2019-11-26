import RComponent from '../RComponent';
import ReactDOM from 'react-dom';

const OriginalFNRenderDom = ReactDOM.render;


function resolveClassComp(component, rules) {
	let inst = component && component.stateNode;
	if(inst instanceof RComponent) {
		inst.componentDidReceivedRules.call(inst, rules);
		return true;
	}
	return false;
}

function resolveHostComp(component, rules) {
	let dom = component.stateNode;
	let keys = Object.keys(dom.style);
	for(var i in rules) {
		if(keys.includes(i)) {
			dom.style[i] = rules[i];
		}
	}
	return true;
}

function resolve(component, rules) {
	if(!component)return false;
	let tag = component.tag;
	switch(tag) {
		case 5:
			return resolveHostComp(component, rules)
		case 1:
			return resolveClassComp(component, rules);
		default:
			return false;
	}
}

export default class DomResolver {
	constructor() {
		this.resolve = resolve.bind(this);

		ReactDOM.render = this.RenderDom.bind(this);


	}

	RenderDom(...args) {
		let [RElem, Root] = args;

		let result = OriginalFNRenderDom(RElem, Root);
		this.FiberRoot = Root._reactRootContainer._internalRoot;
		
		console.log("[!] RenderDom > ", RElem, Root, this.FiberRoot);

		return result;
	}

}



export {
	resolve,

}