'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _logo = require('./logo.svg');

var _logo2 = _interopRequireDefault(_logo);

require('./App.css');

var _Universal = require('!!raw-loader!./rules/Universal.css');

var _Universal2 = _interopRequireDefault(_Universal);

var _DomResolver = require('./lib/Resolvers/DomResolver');

var _DomResolver2 = _interopRequireDefault(_DomResolver);

var _lib = require('./lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// eslint-disable-next-line import/no-webpack-loader-syntax


var Wrapper = new _lib2.default(new _DomResolver2.default());
Wrapper.Ruler.addRuleFile(_Universal2.default);

// let counter = 0;
// const RCOriginal = React.Component;
// class RC extends RCOriginal {
//   constructor(props) {
//     super(props);
//     this._uid = counter++;
//     console.log("EAFFAEEAF");
//   }
// }
// const RCFake = RC;
// React.Component = RCFake;

var TestComp = function (_React$Component) {
  _inherits(TestComp, _React$Component);

  function TestComp(props) {
    _classCallCheck(this, TestComp);

    var _this = _possibleConstructorReturn(this, (TestComp.__proto__ || Object.getPrototypeOf(TestComp)).call(this, props));

    _this.state = {
      test: 123
      // setInterval(() => this.setState({
      //   test: parseInt(Math.random() * 10)
      // }), 2000)
    };console.log("CREATE TESTCOMP", _this.rules);
    // window.onclick = () => this.setState({test:this.state.test+1});

    return _this;
  }

  _createClass(TestComp, [{
    key: 'render',
    value: function render() {
      console.log("RENDER TESTCOMP RULESSS", this.rules, this.props);
      // let arr = [];
      // for(var i=0;i<parseInt(this.rules.testIt || 0);i++) {
      //   arr.push(<p> RULE: {i}</p>);
      // }
      return _react2.default.createElement(
        'div',
        null,
        'This is a test component',
        _react2.default.createElement(
          'p',
          null,
          'Test prop: ',
          this.props.test
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'b',
            null,
            'Test BOLD'
          )
        ),
        _react2.default.createElement(
          'p',
          null,
          'Test state: ',
          this.state.test
        ),
        _react2.default.createElement(
          'p',
          null,
          'Wrapper ID: ',
          this.__WrapperId
        ),
        _react2.default.createElement(
          'p',
          null,
          'GET ID: ',
          this.__WrapperId
        ),
        _react2.default.createElement(
          'p',
          null,
          'RULES : ',
          JSON.stringify(this.rules)
        )
      );
    }
  }]);

  return TestComp;
}(_react2.default.Component);

var App = function (_React$Component2) {
  _inherits(App, _React$Component2);

  function App(props) {
    _classCallCheck(this, App);

    var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this2.state = {
      t: 0
    };
    window.onclick = function () {
      return _this2.setState({ t: _this2.state.t + 1 });
    };
    return _this2;
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'App' },
        _react2.default.createElement(
          'header',
          { className: 'App-header' },
          _react2.default.createElement('img', { src: _logo2.default, className: 'App-logo', alt: 'logo' }),
          _react2.default.createElement(
            'p',
            null,
            this.state.t,
            ' ',
            this.state.t < 5 ? _react2.default.createElement(
              'div',
              null,
              'SHIT'
            ) : null
          ),
          _react2.default.createElement(TestComp, { test: this.state.t })
        )
      );
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;