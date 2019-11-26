'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DomResolver = exports.NativeResolver = exports.Wrapper = undefined;

var _lib = require('./lib');

var _lib2 = _interopRequireDefault(_lib);

var _NativeResolver = require('./lib/Resolvers/NativeResolver');

var _NativeResolver2 = _interopRequireDefault(_NativeResolver);

var _DomResolver = require('./lib/Resolvers/DomResolver');

var _DomResolver2 = _interopRequireDefault(_DomResolver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _lib2.default;
var Wrapper = exports.Wrapper = _lib2.default;

var NativeResolver = exports.NativeResolver = _NativeResolver2.default;
var DomResolver = exports.DomResolver = _DomResolver2.default;