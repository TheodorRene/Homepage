import React, { Component } from 'react';
import './App.css';
import Voting from './comp';

//Sesam vs pizzabakere
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Sesam vs Pizzabakeren</h1>
          <div className="main">
            <Voting />
          </div>
        </header>
      </div>
    );
  }
}



export default App;
