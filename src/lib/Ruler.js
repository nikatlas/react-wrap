import CSS from 'css';

const MATCH_RECURSIVE = '$';
const MATCH_NODE = / *([a-zA-Z-_*]+) */gm;
const MATCH_CHILD = / *> */gm;
const MATCH_SPACES = / +/gm;
const MATCH_PLUS = / *\+ */gm;
const MATCH_MINUS = / *\- */gm;
export default class RulingSystem {
	constructor() {
		this.rules = [];
		this.index = {};
	}

	getRULES(id){
		return this.rules[id];
	}


	getDeclarations(rule) {
		let res = rule.declarations.reduce((acc, curr) => {
			return {
				...acc,
				[curr.property]: curr.value
			}
		}, {});

		return res;
	}

	getCSS(Node, Renderer) {
		let { 
			rules
		} = this.match(Node,Renderer);
		let css = rules.map(r => this.getDeclarations(r))
		let main = css.reduce((acc, curr) => {
			return {
				...acc,
				...curr
			}
		}, {});
		return { rules: main };
	}

	matchFiberNode(node, Renderer) {
		return this.getCSS(node, Renderer);
	}

	match(Node, Renderer) {
		let rules = [];
		// ALL CHECK
		// for(var i in this.rules) {
		// 	let rule = this.rules[i];
		// 	if(this.matchRule(rule, Node, Renderer)) {
		// 		rules.push(rule);
		// 	}
		// }
		// Index
		if(!Node) return {rules: []};
		let array = [
			...(this.index['*'] || []), 
			...(this.index[this.getType(Node)] || [])
		]; // Find Rules based on Selector

		for(var i in array) {
			let rule = array[i];
			if (this.matchRule(rule, Node, Renderer)) {
				rules.push(rule);
			}
		}

		return { rules };
	}

	matchRule(rule, Node, Renderer, prefix) {
		let {
			selectors,
			// declarations
		} = rule;
		
		for (let i in selectors) {
			let selector = selectors[i];
			if (this.matchSelector(selector, Node, Renderer, prefix)) {
				// console.log("SELECTOR MATCH: ", rule, Node);
				return true;
			}
		}

		return false;
	}

	getType(Node) {
		switch(typeof Node.type) {
			case "function": return Node.type.name;
			default: return Node.type;
		}
	}
	matchSelector(selector, Node, Renderer, prefix = "") {
		// if((Node.depth+1) < selector.length) return false;
		let TempNode = Node;
		for (let i = selector.length-1; i >= 0; i--) {
			// let ViewNode = Node.content;
			let {
				nodes, 
				prenodes,
				nextnodes,
				recursive
			} = selector[i];

			if(!TempNode) return false;
			
			
			// if(View.isRoot(Node) && nodes.includes('ROOT')) return true;
			// if(!Node.content)return false;
			// console.log(type);
			if(!recursive && !nodes.includes(prefix+this.getType(TempNode)) && !nodes.includes(prefix+'*')){
				return false;
			}

			// if(prenodes.length > 0) {
			// 	let preNode = View.getBefore(Node);
			// 	let preNodeValue = preNode && preNode.content && preNode.content.value;
			// 	if(preNodeValue && !prenodes.includes(preNodeValue)){
			// 		return false;
			// 	}
			// }
			// if(nextnodes.length > 0) {
			// 	let afterNode = View.getAfter(Node);
			// 	let afterNodeValue = afterNode && afterNode.content && afterNode.content.value;
			// 	if(afterNodeValue && !nextnodes.includes(afterNodeValue)){
			// 		return false;
			// 	}
			// }

			do{
				TempNode = TempNode.return;
			} while(
				TempNode && [0,1,5].includes(TempNode.tag) === false // we are interested in these tags
				&& 
				recursive && !nodes.includes(prefix+this.getType(TempNode)) // if recursive look until DARKNESS
			)
		}
		// console.log("RULE APPLY: ", Node, selector);
		return true;
	}

	parseSelector(selector) {
		let string = selector;
		let tree = string.split(MATCH_CHILD);
		for (let i in tree) {
			let recursive = tree[i][tree[i].length-1] === MATCH_RECURSIVE;
			if(recursive)
				tree[i] = tree[i].slice(0,-1)
			let minus = tree[i].split(MATCH_MINUS);
			if(minus.length === 1) {
				minus[1] = minus[0];
				minus[0] = "";
			}
			let plus = minus[1].split(MATCH_PLUS);
			if(plus.length === 1) {
				plus[1] = "";
			}
			let nodes = plus[0].split(MATCH_SPACES).filter(Boolean);
			let prenodes = minus[0].split(MATCH_SPACES).filter(Boolean);
			let nextnodes = plus[1].split(MATCH_SPACES).filter(Boolean);
			tree[i] = {
				nodes,
				prenodes,
				nextnodes,
				recursive,
				initial: tree[i]
			}
		}
		return tree;
	}

	addRule(rule) {
		let {
			selectors,
			declarations
		} = rule;
		let parsed = selectors.map(s => this.parseSelector(s))
		let res = {
			selectors: parsed,
			declarations
		}
		this.rules.push(res);
		parsed.forEach(selectorGroup => {
			selectorGroup.forEach(selector => { 
				selector.nodes.forEach(node => {
					if(!this.index[node])this.index[node] = [];
					this.index[node].push(res);
				})
			})
		});
	}

	addRuleFile = (file) => {
		let ruleCSS = CSS.parse(file);
		console.log("RULECSS++", ruleCSS);
		for(var i in ruleCSS.stylesheet.rules) {
			this.addRule(ruleCSS.stylesheet.rules[i]);
		}
	}

	export() {
		return {};
	}

	import(data) {
		return this;
	}
}