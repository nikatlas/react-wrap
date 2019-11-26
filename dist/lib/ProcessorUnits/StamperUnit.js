'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Counter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Unit2 = require('../Unit');

var _Unit3 = _interopRequireDefault(_Unit2);

var _objectHash = require('object-hash');

var _objectHash2 = _interopRequireDefault(_objectHash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Counter = exports.Counter = function () {
	function Counter(seed) {
		_classCallCheck(this, Counter);

		this.v = seed;
		this.seed = seed;
	}

	_createClass(Counter, [{
		key: 'getNext',
		value: function getNext() {
			return this.v++;
		}
	}, {
		key: 'reset',
		value: function reset() {
			this.v = this.seed;
		}
	}]);

	return Counter;
}();

var StamperUnit = function (_Unit) {
	_inherits(StamperUnit, _Unit);

	function StamperUnit() {
		_classCallCheck(this, StamperUnit);

		var _this = _possibleConstructorReturn(this, (StamperUnit.__proto__ || Object.getPrototypeOf(StamperUnit)).call(this));

		_this.verbose();
		_this.counter = new Counter(100);
		return _this;
	}

	_createClass(StamperUnit, [{
		key: 'reset',
		value: function reset() {
			console.log("STAMPER RESET COUNTER", this.counter);
			this.counter && this.counter.reset();
		}
	}, {
		key: 'run',
		value: function run(args, renderer) {
			var _args = _toArray(args),
			    ctor = _args[0],
			    props = _args[1],
			    children = _args.slice(2);
			// let childrenStamps = children.map((child) => child.props.stamp);
			// give stamp


			props.stamp = this.counter.getNext();
			// raise counter
			this.log("[-->] StamperUnit: ", ctor, children);
			return args;
		}
	}]);

	return StamperUnit;
}(_Unit3.default);

exports.default = StamperUnit;