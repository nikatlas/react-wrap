'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Unit2 = require('../Unit');

var _Unit3 = _interopRequireDefault(_Unit2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TestRendererUnit = function (_Unit) {
	_inherits(TestRendererUnit, _Unit);

	function TestRendererUnit() {
		_classCallCheck(this, TestRendererUnit);

		var _this = _possibleConstructorReturn(this, (TestRendererUnit.__proto__ || Object.getPrototypeOf(TestRendererUnit)).call(this));

		_this.verbose();
		return _this;
	}

	_createClass(TestRendererUnit, [{
		key: 'run',
		value: function run(args, renderer) {
			var _args = _toArray(args),
			    ctor = _args[0],
			    props = _args[1],
			    children = _args.slice(2);

			var stamp = props.stamp;
			var childrenStamps = void 0;
			var rules = _react2.default.getRules(stamp);

			props.rules = rules;
			this.log("[-->] TestRendererUnit: ", stamp, rules);
			return args;
		}
	}]);

	return TestRendererUnit;
}(_Unit3.default);

exports.default = TestRendererUnit;