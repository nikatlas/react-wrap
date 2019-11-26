import React from 'react';
// import TestRenderer from 'react-test-renderer';

// import TestUnit from './ProcessorUnits/TestUnit';
// import StamperUnit from './ProcessorUnits/StamperUnit';
// import LinkingUnit from './ProcessorUnits/LinkingUnit';
// import TestRendererUnit from './ProcessorUnits/TestRendererUnit';

import ISystem from './ISystem';
import Processor from './Processor';
import RComponent from './RComponent';
import Ruler from './Ruler';

import {
  traverse,
  // traverseGenerator,
  // findNodeByComponent,
  // findNodeByComponentRef,
  // findNodeByComponentName,
  // matchGenerator,
  // matchAll,
  // matchFirst,
  // Utils
} from "react-fiber-traverse";


const OriginalFNCreateElement = React.createElement;
const OriginalFNCloneElement = React.cloneElement;
const OriginalRComponent = React.Component;
React.Component = RComponent;
React.Ruler = {
	OriginalComponent: OriginalRComponent
};
class Core extends ISystem {
	constructor(resolver) {
		super();
		React.createElement = this.handle.bind(this);
		React.cloneElement = this.handleClone.bind(this);
		React.getRules = this.getRules.bind(this);

		// let Stamper = new StamperUnit();
		// this.resetStamper = Stamper.reset.bind(Stamper);
		// Processor.addUnit(Stamper);
		// // Processor.addUnit(new LinkingUnit());
		// Processor.addUnit(new TestRendererUnit());

		this.Resolver = resolver;

		this.Ruler = new Ruler();
		this.renderer = null;
		this.ruleIndex = {};
	}

	// render = (...args) => {
	// 	let [RElem, Root] = args;

	// 	console.log("[!] Render > ", RElem, Root);

	// 	// this.renderer = TestRenderer.create(RElem);
	// 	console.log("[!] Render > COMPLETE");

	// 	let r = OriginalFNRenderDom(Relem, Root);
		
	// 	return r;


	// 	// return OriginalFNRenderDom(<div ref={(r) => {
	// 	// 	this.ref = r; 
	// 	// 	console.log("REF++",r);
	// 	// 	for(var i in r) {
	// 	// 		if(i.startsWith("__reactInternalInstance")) {
	// 	// 			this.FiberRoot = r[i];
	// 	// 			console.log("REF+++",r[i]);
	// 	// 		}
	// 	// 	}
	// 	// }}>{RElem}</div>, Root);
	// }

	setFiberRoot = (Root) => {
		this.FiberRoot = Root;
	}
	// setRenderView = (renderfn) => {
	// 	this.renderView = renderfn;
	// 	return () => {
	// 		let res = renderfn();
	// 		return (<View ref={(r) => {
	// 			this.ref = r;
	// 			console.log("REF++",r);
	// 			for(var i in r) {
	// 				if(i.startsWith("__reactInternalInstance")) {
	// 					this.FiberRoot = r[i];
	// 					console.log("REF+++",r[i]);
	// 				}
	// 			}
	// 		}}>
	// 			{res}
	// 		</View>);
	// 	}
	// }
	
	onFrame = (fn) => {
		this.__onFrame = fn;
	}	

	handleClone = (...args) => {
		return OriginalFNCloneElement(...args);
	}

	handle = (...args) => {
		// console.log("[!] Handle > ", ...args);
		// let nnow = window.performance.now();
		// renderer.
		// let nthen = window.performance.now();
		// console.log("[/|\] SpeedTest : ", nthen - nnow);
		this.__resolving || this.makeDirty.call(this);
		let manipulated = Processor.manipulate(args, this.renderer);
		let elem = OriginalFNCreateElement(...manipulated);
		// console.log("ELEM", elem);
		return elem;
	}

	getRules = (id) => {
		// console.log("GET RULES FOR ID: ", id, this.ruleIndex);
		return this.ruleIndex[id] || {};
	}


	makeDirty = () => {
		this.dirty = true;
		this._dirtyTimeout = this._dirtyTimeout || setTimeout(() => this.checkUpdates(), 7);
	}

	checkUpdates = () => {
		console.log("Check Updates", this.Ruler.rules, this.renderer, this.originalRendererRef, this, !!this.FiberRoot);

		this.dirty = false;
		this._dirtyTimeout = false;
		// this.resetStamper && this.resetStamper();
		let crn = this.Resolver.FiberRoot.current;
		crn && traverse(crn, (n) => {
			let css = this.Ruler.matchFiberNode(n, this.renderer);
			this.sendRulesToComponent(css.rules, n);
		});

		console.log("[!] UPDATE RESULTS : " , this.ruleIndex, this, crn)
		// for(var i in this.stamps) {
		// }

		// if (this.memos[id] !== rules) {
		// 	this.memos[id] = rules;
		// }
		
	}

	sendRulesToComponent(rules, component) {
		let inst = component && component.stateNode;
		let tag = component && component.tag;
		this.__resolving = true;
		this.Resolver.resolve(component, rules);
		this.__resolving = false;
	}
}

export default Core;