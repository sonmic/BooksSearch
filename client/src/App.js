import React, { Component, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Search from "./components/Search";
import Saved from "./components/Saved";
import BookAppBar from "./components/BookAppBar";

function App() {
  const [books, setBooks] = useState([]);
  return (
    <Router>
      <div>
        <BookAppBar onSearch={setBooks} />
        <Switch>
          <Route exact path="/fav" component={Saved} />
          <Route>
            <Search books={books} onSearch={setBooks} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
