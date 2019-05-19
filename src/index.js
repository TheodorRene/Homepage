import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Scoreboard from "./comp";
import Navbar from "./base";
import Home from "./home";
import CurriculumBooks from "./curr_books/books";
import AdminLogin from "./admin/admin_index.js"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Router>
      {window.location.pathname!=="/" && <Navbar />}
    <Switch>
      <Route exact path="/" component={WorkInProgress} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/curr" component={CurriculumBooks} />
      <Route path="/edit/" component={App} />
      <Route path="/index" component={Scoreboard} />
      <Route path="/admin" component={AdminLogin} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

function WorkInProgress(props){

const center2 = {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
}
    return(
        <div style={center2}>
            <h1 className="white-text"> Work in progress </h1>
        </div>
    )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
