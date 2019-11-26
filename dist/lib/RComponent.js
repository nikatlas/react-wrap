'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.resetCounter = resetCounter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CCCOUNTER = 1000;
function resetCounter() {
	CCCOUNTER = 1000;
};

var RComponent = function (_React$Component) {
	_inherits(RComponent, _React$Component);

	function RComponent(props) {
		_classCallCheck(this, RComponent);

		var _this = _possibleConstructorReturn(this, (RComponent.__proto__ || Object.getPrototypeOf(RComponent)).call(this, props));

		_this.__WrapperId = CCCOUNTER++;
		// this.props.__WrapperId = this.__WrapperId;
		_this.rules = {};
		return _this;
	}

	_createClass(RComponent, [{
		key: 'componentDidReceivedRules',
		value: function componentDidReceivedRules(rules) {
			console.log("RECEIVED RULES:", rules, this);

			var style = rules.style,
			    restRules = _objectWithoutProperties(rules, ['style']);

			this.rules = restRules;

			this.forceUpdate();
		}
	}]);

	return RComponent;
}(_react2.default.Component);

exports.default = RComponent;