"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Unit = function () {
	function Unit(id) {
		_classCallCheck(this, Unit);

		this.id = id || Math.random();
		this.runner = this.run;
	}

	_createClass(Unit, [{
		key: "verbose",
		value: function verbose() {
			this._verbose = true;
		}
	}, {
		key: "log",
		value: function log() {
			var _console;

			if (this._verbose) (_console = console).log.apply(_console, arguments);
		}
	}, {
		key: "run",
		value: function run(args) {
			throw new Error("Override me plz!");
		}
	}]);

	return Unit;
}();

exports.default = Unit;