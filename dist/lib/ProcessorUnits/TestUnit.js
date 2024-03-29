"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Unit2 = require("../Unit");

var _Unit3 = _interopRequireDefault(_Unit2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TestUnit = function (_Unit) {
	_inherits(TestUnit, _Unit);

	function TestUnit() {
		_classCallCheck(this, TestUnit);

		return _possibleConstructorReturn(this, (TestUnit.__proto__ || Object.getPrototypeOf(TestUnit)).call(this));
	}

	_createClass(TestUnit, [{
		key: "run",
		value: function run(args, renderer) {
			// console.log("[-->] TestUnit: ", args, renderer);
			var props = args[1];
			var id = props.____id;
			try {
				var item = renderer && renderer.root.findByProps(props);
				console.log("--->", item);
			} catch (r) {
				console.log("---> ID ", id, renderer.root);
			}
			return args;
		}
	}]);

	return TestUnit;
}(_Unit3.default);

exports.default = TestUnit;