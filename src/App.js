import React, { Component } from 'react';
import MainContainer from './components/MainContainer'
import './App.css';

class App extends Component {
  render() {
    console.log("Made awesomely by Ian Ramos and Will Scripps");
    return (<div style={{padding: "50px"}} className="App"><MainContainer /></div>);
  }
}

export default App;
