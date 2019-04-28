import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Scoreboard from "./comp";
import Navbar from "./base";
import Home from "./home";
import CurriculumBooks from "./curr_books/books";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Router>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/curr" component={CurriculumBooks} />
      <Route path="/edit/" component={App} />
      <Route path="/index" component={Scoreboard} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
