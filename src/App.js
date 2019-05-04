import React, { Component } from 'react';
import './App.css';
import Voting from './comp';

//Backend test
class Backend extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:8000/")
      //.then(res => res.json())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }
  render(){
    return(
      <p>Fen: {this.state.apiResponse.fen}</p>
    )
  }
}
//Sesam vs pizzabakere
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Sesam vs Pizzabakeren</h1>
          <div className="main">
            <Voting />
            <Backend />
          </div>
        </header>
      </div>
    );
  }
}



export default App;
