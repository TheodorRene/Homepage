import React, { Component } from 'react';
import './App.css';

class Backend extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }
  render(){
    return(
      <p>{this.state.apiResponse}</p>
    )
  }
}
class App extends Component {
  constructor(props) {
    super(props)
    this.state = { score_pb: 0, score_sesam: 0}
    this.handleVoteChange = this.handleVoteChange.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  //onclick function
  handleVoteChange(team) {
    //Check if user has voted
    if (localStorage.getItem("hasVoted")){
      return;
    }
    if (team === "pb") {
      this.setState({ score_pb: this.state.score_pb + 1 });
    } else if (team === "sesam") {
      this.setState({ score_sesam: this.state.score_sesam + 1 });
    }
    localStorage.setItem("hasVoted", "True");
  }

  //onclick function
  handleReset = () => {this.setState({score_pb:0}); this.setState({score_sesam:0})}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Sesam vs Pizzabakeren</h1>
        </header>
        <div className="main">
          <Scoreboard pb={this.state.score_pb} sesam={this.state.score_sesam} />
          <Button team="pb" verbose="Pizzabakeren" handleChange={this.handleVoteChange} />
          <Button team="sesam" verbose="Sesam" handleChange={this.handleVoteChange} />
          <Button team="NULL" verbose="Reset" handleChange={this.handleReset} />
          <Backend />
        </div>
      </div>
    );
  }
}
class Scoreboard extends Component{
  render() {
    return(
      <div>
        <h1>Pizzabakeren har {this.props.pb} </h1>
        <h1>Sesam har {this.props.sesam} </h1>
      </div>
    );
  };
}

class Button extends Component{

  vote = team => {this.props.handleChange(team);};

  render(){
    return(
      <button onClick={() => this.vote(this.props.team)}>{this.props.verbose}</button>
    );
  }
}

export default App;
