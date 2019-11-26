'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.resolve = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RComponent = require('../RComponent');

var _RComponent2 = _interopRequireDefault(_RComponent);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OriginalFNRenderDom = _reactDom2.default.render;

function resolveClassComp(component, rules) {
	var inst = component && component.stateNode;
	if (inst instanceof _RComponent2.default) {
		inst.componentDidReceivedRules.call(inst, rules);
		return true;
	}
	return false;
}

function resolveHostComp(component, rules) {
	var dom = component.stateNode;
	var keys = Object.keys(dom.style);
	for (var i in rules) {
		if (keys.includes(i)) {
			dom.style[i] = rules[i];
		}
	}
	return true;
}

function resolve(component, rules) {
	if (!component) return false;
	var tag = component.tag;
	switch (tag) {
		case 5:
			return resolveHostComp(component, rules);
		case 1:
			return resolveClassComp(component, rules);
		default:
			return false;
	}
}

var DomResolver = function () {
	function DomResolver() {
		_classCallCheck(this, DomResolver);

		this.resolve = resolve.bind(this);

		_reactDom2.default.render = this.RenderDom.bind(this);
	}

	_createClass(DomResolver, [{
		key: 'RenderDom',
		value: function RenderDom() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			var RElem = args[0],
			    Root = args[1];


			var result = OriginalFNRenderDom(RElem, Root);
			this.FiberRoot = Root._reactRootContainer._internalRoot;

			console.log("[!] RenderDom > ", RElem, Root, this.FiberRoot);

			return result;
		}
	}]);

	return DomResolver;
}();

exports.default = DomResolver;
exports.resolve = resolve;