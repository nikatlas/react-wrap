import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

// eslint-disable-next-line import/no-webpack-loader-syntax
import UniversalRules from '!!raw-loader!./rules/Universal.css';

import domResolver from './lib/Resolvers/DomResolver';
import WrapperCtor from './lib';
let Wrapper = new WrapperCtor(new domResolver());
Wrapper.Ruler.addRuleFile(UniversalRules);

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
class TestComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 123
    }
    // setInterval(() => this.setState({
    //   test: parseInt(Math.random() * 10)
    // }), 2000)
    console.log("CREATE TESTCOMP", this.rules);
    // window.onclick = () => this.setState({test:this.state.test+1});

  }

  render() {
    console.log("RENDER TESTCOMP RULESSS", this.rules, this.props);
    // let arr = [];
    // for(var i=0;i<parseInt(this.rules.testIt || 0);i++) {
    //   arr.push(<p> RULE: {i}</p>);
    // }
    return <div>
      This is a test component 
      <p>Test prop: {this.props.test}</p>
      <div>
        <b>
          Test BOLD    
        </b>
      </div>
      <p>Test state: {this.state.test}</p>
      <p>Wrapper ID: {this.__WrapperId}</p>
      <p>GET ID: {this.__WrapperId}</p>
      <p>RULES : {JSON.stringify(this.rules)}</p> 
    </div>
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      t: 0
    }
    window.onclick = () => this.setState({t:this.state.t+1});
  }
  render() {
    return (
      
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.state.t} {this.state.t < 5 ? <div>SHIT</div> : null } 
          </p>
          <TestComp test={this.state.t} />
        </header>
      </div>
      
    );
  }
}

export default App;
