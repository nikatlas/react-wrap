'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.resolve = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RComponent = require('../RComponent');

var _RComponent2 = _interopRequireDefault(_RComponent);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

console.log(_reactNative.AppRegistry);
var OriginalFNRenderApplication = _reactNative.AppRegistry.runApplication;

function resolveClassComp(component, rules) {
	var inst = component && component.stateNode;
	if (inst instanceof _RComponent2.default) {
		inst.componentDidReceivedRules.call(inst, rules);
		return true;
	} else if (inst instanceof _react2.default.Ruler.OriginalComponent) {
		resolveNativeHostComp(component, rules);
		return true;
	}
	return false;
}

function resolveNativeHostComp(component, rules) {
	var dom = component.stateNode;
	var style = {};
	for (var i in rules) {
		style[i] = rules[i];
	}
	if (dom.props) {
		var arr = (dom.props.style && Array.isArray(dom.props.style) ? dom.props.style : [dom.props.style]) || [];
		arr.push(style);
		dom.props = _extends({}, dom.props, {
			style: arr
		});
		dom.forceUpdate && dom.forceUpdate();
	}
	return true;
}
function resolveHostComp(component, rules) {
	var dom = component.stateNode;
	var keys = Object.keys(dom.style || {});
	for (var i in rules) {
		if (keys.includes(i)) {
			dom.style[i] = rules[i];
		}
	}
	return true;
}

function resolve(component, rules) {
	if (!component) return false;
	if (Object.keys(rules).length > 0) debugger;
	console.log("RESOLVE COMPONENT:", component);
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

var NativeResolver = function () {
	function NativeResolver() {
		_classCallCheck(this, NativeResolver);

		this.resolve = resolve.bind(this);

		_reactNative.AppRegistry.runApplication = this.RenderNative.bind(this);
	}

	_createClass(NativeResolver, [{
		key: 'RenderNative',
		value: function RenderNative() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			var Name = args[0],
			    rootTag = args[1].rootTag;


			var result = OriginalFNRenderApplication.apply(undefined, args);
			this.FiberRoot = rootTag._reactRootContainer._internalRoot;
			console.log("[!] RenderNative > ", args);
			return result;
		}
	}]);

	return NativeResolver;
}();

exports.default = NativeResolver;
exports.resolve = resolve;