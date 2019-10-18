import React, { Component, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Search from "./components/Search";
import Saved from "./components/Saved";
import BookAppBar from "./components/BookAppBar";
import SearchField from "./components/SearchField";

function App() {
  const [books, setBooks] = useState([]);
  return (
    <Router>
      <div>
        <BookAppBar onSearch={setBooks} />
        <Switch>
          <Route exact path="/fav" component={Saved} />
          <Route>
            <div className="searchPageContainer">
              <div className="logoContainer">
                <div className="logo">Book.com</div>
                <div className="sublogo">One search, all books.</div>
                <SearchField onSearch={setBooks} />
              </div>
              <Search books={books} />
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
