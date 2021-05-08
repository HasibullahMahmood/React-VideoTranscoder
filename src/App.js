import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/home/index";
import "./App.css";

axios.defaults.baseURL = "http://localhost:5000";

const PageNotFound = () => (
  <div>
    404! - <Link to={{ pathname: "/" }}>HOME</Link>
  </div>
);
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
