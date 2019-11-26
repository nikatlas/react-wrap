'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ISystem2 = require('./ISystem');

var _ISystem3 = _interopRequireDefault(_ISystem2);

var _Injector = require('./Injector');

var _Injector2 = _interopRequireDefault(_Injector);

var _Unit = require('./Unit');

var _Unit2 = _interopRequireDefault(_Unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Processor = function (_ISystem) {
	_inherits(Processor, _ISystem);

	function Processor() {
		_classCallCheck(this, Processor);

		var _this = _possibleConstructorReturn(this, (Processor.__proto__ || Object.getPrototypeOf(Processor)).call(this));

		_this.units = [];
		_this.counter = 1;
		return _this;
	}

	_createClass(Processor, [{
		key: 'addUnit',
		value: function addUnit(unit) {
			if (!unit instanceof _Unit2.default) throw new Error("Only units here");
			this.units.push(unit);
		}
	}, {
		key: 'manipulate',
		value: function manipulate(args, renderer) {
			var type = args[0],
			    props = args[1],
			    children = args[2];
			if (!props.____id) {
				props.____id = this.counter++;
			}
			var results = this.units.reduce(function (res, unit) {
				return unit.run(res, renderer);
			}, args);
			this.log(results, args);
			return results;
		}
	}]);

	return Processor;
}(_ISystem3.default);

exports.default = new Processor();