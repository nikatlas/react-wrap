"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Unit2 = require("../Unit");

var _Unit3 = _interopRequireDefault(_Unit2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LinkingUnit = function (_Unit) {
	_inherits(LinkingUnit, _Unit);

	function LinkingUnit() {
		_classCallCheck(this, LinkingUnit);

		// this.verbose();
		var _this = _possibleConstructorReturn(this, (LinkingUnit.__proto__ || Object.getPrototypeOf(LinkingUnit)).call(this));

		_this.tree = [];
		return _this;
	}

	_createClass(LinkingUnit, [{
		key: "onReset",
		value: function onReset() {
			this.tree = [];
		}
	}, {
		key: "addNode",
		value: function addNode(stamp, childrenStamps) {
			this.tree.push({
				stamp: stamp,
				childrenStamps: childrenStamps
			});
		}
	}, {
		key: "run",
		value: function run(args, renderer) {
			var _args = _toArray(args),
			    ctor = _args[0],
			    props = _args[1],
			    children = _args.slice(2);

			var stamp = props.stamp;
			var childrenStamps = void 0;
			try {
				childrenStamps = children.reduce(function (stamps, c) {
					return c && c.props && stamps.push(c.props.stamp) && stamps || stamps;
				}, []);
			} catch (e) {
				debugger;
			}

			this.addNode(stamp, childrenStamps);

			this.log("[-->] LinkingUnit: ", this.tree, stamp, childrenStamps, args);
			return args;
		}
	}]);

	return LinkingUnit;
}(_Unit3.default);

exports.default = LinkingUnit;