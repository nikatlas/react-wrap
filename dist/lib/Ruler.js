'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _css = require('css');

var _css2 = _interopRequireDefault(_css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MATCH_RECURSIVE = '$';
var MATCH_NODE = / *([a-zA-Z-_*]+) */gm;
var MATCH_CHILD = / *> */gm;
var MATCH_SPACES = / +/gm;
var MATCH_PLUS = / *\+ */gm;
var MATCH_MINUS = / *\- */gm;

var RulingSystem = function () {
	function RulingSystem() {
		var _this = this;

		_classCallCheck(this, RulingSystem);

		this.addRuleFile = function (file) {
			var ruleCSS = _css2.default.parse(file);
			console.log("RULECSS++", ruleCSS);
			for (var i in ruleCSS.stylesheet.rules) {
				_this.addRule(ruleCSS.stylesheet.rules[i]);
			}
		};

		this.rules = [];
		this.index = {};
	}

	_createClass(RulingSystem, [{
		key: 'getRULES',
		value: function getRULES(id) {
			return this.rules[id];
		}
	}, {
		key: 'getDeclarations',
		value: function getDeclarations(rule) {
			var res = rule.declarations.reduce(function (acc, curr) {
				return _extends({}, acc, _defineProperty({}, curr.property, curr.value));
			}, {});

			return res;
		}
	}, {
		key: 'getCSS',
		value: function getCSS(Node, Renderer) {
			var _this2 = this;

			var _match = this.match(Node, Renderer),
			    rules = _match.rules;

			var css = rules.map(function (r) {
				return _this2.getDeclarations(r);
			});
			var main = css.reduce(function (acc, curr) {
				return _extends({}, acc, curr);
			}, {});
			return { rules: main };
		}
	}, {
		key: 'matchFiberNode',
		value: function matchFiberNode(node, Renderer) {
			return this.getCSS(node, Renderer);
		}
	}, {
		key: 'match',
		value: function match(Node, Renderer) {
			var rules = [];
			// ALL CHECK
			// for(var i in this.rules) {
			// 	let rule = this.rules[i];
			// 	if(this.matchRule(rule, Node, Renderer)) {
			// 		rules.push(rule);
			// 	}
			// }
			// Index
			if (!Node) return { rules: [] };
			var array = [].concat(_toConsumableArray(this.index['*'] || []), _toConsumableArray(this.index[this.getType(Node)] || [])); // Find Rules based on Selector

			for (var i in array) {
				var rule = array[i];
				if (this.matchRule(rule, Node, Renderer)) {
					rules.push(rule);
				}
			}

			return { rules: rules };
		}
	}, {
		key: 'matchRule',
		value: function matchRule(rule, Node, Renderer, prefix) {
			var selectors = rule.selectors;


			for (var i in selectors) {
				var selector = selectors[i];
				if (this.matchSelector(selector, Node, Renderer, prefix)) {
					// console.log("SELECTOR MATCH: ", rule, Node);
					return true;
				}
			}

			return false;
		}
	}, {
		key: 'getType',
		value: function getType(Node) {
			switch (_typeof(Node.type)) {
				case "function":
					return Node.type.name;
				default:
					return Node.type;
			}
		}
	}, {
		key: 'matchSelector',
		value: function matchSelector(selector, Node, Renderer) {
			var prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

			// if((Node.depth+1) < selector.length) return false;
			var TempNode = Node;
			for (var i = selector.length - 1; i >= 0; i--) {
				// let ViewNode = Node.content;
				var _selector$i = selector[i],
				    nodes = _selector$i.nodes,
				    prenodes = _selector$i.prenodes,
				    nextnodes = _selector$i.nextnodes,
				    recursive = _selector$i.recursive;


				if (!TempNode) return false;

				// if(View.isRoot(Node) && nodes.includes('ROOT')) return true;
				// if(!Node.content)return false;
				// console.log(type);
				if (!recursive && !nodes.includes(prefix + this.getType(TempNode)) && !nodes.includes(prefix + '*')) {
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

				do {
					TempNode = TempNode.return;
				} while (TempNode && [0, 1, 5].includes(TempNode.tag) === false // we are interested in these tags
				&& recursive && !nodes.includes(prefix + this.getType(TempNode)) // if recursive look until DARKNESS
				);
			}
			// console.log("RULE APPLY: ", Node, selector);
			return true;
		}
	}, {
		key: 'parseSelector',
		value: function parseSelector(selector) {
			var string = selector;
			var tree = string.split(MATCH_CHILD);
			for (var i in tree) {
				var recursive = tree[i][tree[i].length - 1] === MATCH_RECURSIVE;
				if (recursive) tree[i] = tree[i].slice(0, -1);
				var minus = tree[i].split(MATCH_MINUS);
				if (minus.length === 1) {
					minus[1] = minus[0];
					minus[0] = "";
				}
				var plus = minus[1].split(MATCH_PLUS);
				if (plus.length === 1) {
					plus[1] = "";
				}
				var nodes = plus[0].split(MATCH_SPACES).filter(Boolean);
				var prenodes = minus[0].split(MATCH_SPACES).filter(Boolean);
				var nextnodes = plus[1].split(MATCH_SPACES).filter(Boolean);
				tree[i] = {
					nodes: nodes,
					prenodes: prenodes,
					nextnodes: nextnodes,
					recursive: recursive,
					initial: tree[i]
				};
			}
			return tree;
		}
	}, {
		key: 'addRule',
		value: function addRule(rule) {
			var _this3 = this;

			var selectors = rule.selectors,
			    declarations = rule.declarations;

			var parsed = selectors.map(function (s) {
				return _this3.parseSelector(s);
			});
			var res = {
				selectors: parsed,
				declarations: declarations
			};
			this.rules.push(res);
			parsed.forEach(function (selectorGroup) {
				selectorGroup.forEach(function (selector) {
					selector.nodes.forEach(function (node) {
						if (!_this3.index[node]) _this3.index[node] = [];
						_this3.index[node].push(res);
					});
				});
			});
		}
	}, {
		key: 'export',
		value: function _export() {
			return {};
		}
	}, {
		key: 'import',
		value: function _import(data) {
			return this;
		}
	}]);

	return RulingSystem;
}();

exports.default = RulingSystem;