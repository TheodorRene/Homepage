import React,{useState} from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import Navbar from "./base";
import Home from "./home";
import CurriculumBooks from "./curr_books/books";
import AdminLogin from "./admin/admin_index.js"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Router>
      <Navbar />
    <Switch>
      <Route exact path="/workinprogress" component={WorkInProgress} />
      <Route exact path="/" component={Home} />
      <Route exact path="/curr" component={CurriculumBooks} />
      <Route path="/admin" component={AdminLogin} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

function WorkInProgress(props){
    const [isVisible,setisVisible] = useState(false)


const center2 = {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%"
}
    return(
        <div style={center2}>
            <h1 className="white-text"> Work in progress </h1>
            <button type="button" class="waves-effect btn" onClick={() => setisVisible(!isVisible)}> Login </button>
            {isVisible && <AdminLogin />}
        </div>
    )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
