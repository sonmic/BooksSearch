import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Search from "./components/Search";
import Saved from "./components/Saved";
import BookAppBar from "./components/BookAppBar";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <BookAppBar />
          <Switch>
            <Route exact path="/fav" component={Saved} />
            <Route component={Search} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
