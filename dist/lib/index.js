'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ISystem2 = require('./ISystem');

var _ISystem3 = _interopRequireDefault(_ISystem2);

var _Processor = require('./Processor');

var _Processor2 = _interopRequireDefault(_Processor);

var _RComponent = require('./RComponent');

var _RComponent2 = _interopRequireDefault(_RComponent);

var _Ruler = require('./Ruler');

var _Ruler2 = _interopRequireDefault(_Ruler);

var _reactFiberTraverse = require('react-fiber-traverse');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import TestRenderer from 'react-test-renderer';

// import TestUnit from './ProcessorUnits/TestUnit';
// import StamperUnit from './ProcessorUnits/StamperUnit';
// import LinkingUnit from './ProcessorUnits/LinkingUnit';
// import TestRendererUnit from './ProcessorUnits/TestRendererUnit';

var OriginalFNCreateElement = _react2.default.createElement;
var OriginalFNCloneElement = _react2.default.cloneElement;
var OriginalRComponent = _react2.default.Component;
_react2.default.Component = _RComponent2.default;
_react2.default.Ruler = {
	OriginalComponent: OriginalRComponent
};

var Core = function (_ISystem) {
	_inherits(Core, _ISystem);

	function Core(resolver) {
		_classCallCheck(this, Core);

		var _this = _possibleConstructorReturn(this, (Core.__proto__ || Object.getPrototypeOf(Core)).call(this));

		_this.setFiberRoot = function (Root) {
			_this.FiberRoot = Root;
		};

		_this.onFrame = function (fn) {
			_this.__onFrame = fn;
		};

		_this.handleClone = function () {
			return OriginalFNCloneElement.apply(undefined, arguments);
		};

		_this.handle = function () {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			// console.log("[!] Handle > ", ...args);
			// let nnow = window.performance.now();
			// renderer.
			// let nthen = window.performance.now();
			// console.log("[/|\] SpeedTest : ", nthen - nnow);
			_this.__resolving || _this.makeDirty.call(_this);
			var manipulated = _Processor2.default.manipulate(args, _this.renderer);
			var elem = OriginalFNCreateElement.apply(undefined, _toConsumableArray(manipulated));
			// console.log("ELEM", elem);
			return elem;
		};

		_this.getRules = function (id) {
			// console.log("GET RULES FOR ID: ", id, this.ruleIndex);
			return _this.ruleIndex[id] || {};
		};

		_this.makeDirty = function () {
			_this.dirty = true;
			_this._dirtyTimeout = _this._dirtyTimeout || setTimeout(function () {
				return _this.checkUpdates();
			}, 7);
		};

		_this.checkUpdates = function () {
			console.log("Check Updates", _this.Ruler.rules, _this.renderer, _this.originalRendererRef, _this, !!_this.FiberRoot);

			_this.dirty = false;
			_this._dirtyTimeout = false;
			// this.resetStamper && this.resetStamper();
			var crn = _this.Resolver.FiberRoot.current;
			crn && (0, _reactFiberTraverse.traverse)(crn, function (n) {
				var css = _this.Ruler.matchFiberNode(n, _this.renderer);
				_this.sendRulesToComponent(css.rules, n);
			});

			console.log("[!] UPDATE RESULTS : ", _this.ruleIndex, _this, crn);
			// for(var i in this.stamps) {
			// }

			// if (this.memos[id] !== rules) {
			// 	this.memos[id] = rules;
			// }
		};

		_react2.default.createElement = _this.handle.bind(_this);
		_react2.default.cloneElement = _this.handleClone.bind(_this);
		_react2.default.getRules = _this.getRules.bind(_this);

		// let Stamper = new StamperUnit();
		// this.resetStamper = Stamper.reset.bind(Stamper);
		// Processor.addUnit(Stamper);
		// // Processor.addUnit(new LinkingUnit());
		// Processor.addUnit(new TestRendererUnit());

		_this.Resolver = resolver;

		_this.Ruler = new _Ruler2.default();
		_this.renderer = null;
		_this.ruleIndex = {};
		return _this;
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

	_createClass(Core, [{
		key: 'sendRulesToComponent',
		value: function sendRulesToComponent(rules, component) {
			var inst = component && component.stateNode;
			var tag = component && component.tag;
			this.__resolving = true;
			this.Resolver.resolve(component, rules);
			this.__resolving = false;
		}
	}]);

	return Core;
}(_ISystem3.default);

exports.default = Core;