import React from 'react';
import RComponent from '../RComponent';
import { AppRegistry } from 'react-native';


console.log(AppRegistry);
const OriginalFNRenderApplication = AppRegistry.runApplication;


function resolveClassComp(component, rules) {
	let inst = component && component.stateNode;
	if(inst instanceof RComponent) {
		inst.componentDidReceivedRules.call(inst, rules);
		return true;
	} else if (inst instanceof React.Ruler.OriginalComponent) {
		resolveNativeHostComp(component, rules);
		return true;
	}
	return false;
}

function resolveNativeHostComp(component, rules) {
	let dom = component.stateNode;
	let style = {};
	for(let i in rules) {
		style[i] = rules[i];
	}
	if(dom.props) {
		let arr = (dom.props.style && Array.isArray(dom.props.style) ? dom.props.style : [dom.props.style]) || [];
		arr.push(style);
		dom.props = {
			...dom.props,
			style: arr
		};
		dom.forceUpdate && dom.forceUpdate();
	}
	return true;
}
function resolveHostComp(component, rules) {
	let dom = component.stateNode;
	let keys = Object.keys(dom.style || {});
	for(let i in rules) {
		if(keys.includes(i)) {
			dom.style[i] = rules[i];
		}
	}
	return true;
}

function resolve(component, rules) {
	if (!component) return false;
	if (Object.keys(rules).length > 0) 
		debugger;
	console.log("RESOLVE COMPONENT:", component);
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

export default class NativeResolver {
	constructor() {
		this.resolve = resolve.bind(this);

		AppRegistry.runApplication = this.RenderNative.bind(this);
	}

	RenderNative(...args) {
		let [Name, { rootTag }] = args;

		let result = OriginalFNRenderApplication(...args);
		this.FiberRoot = rootTag._reactRootContainer._internalRoot;
		console.log("[!] RenderNative > ", args);
		return result;
	}
}

export {
	resolve,
}