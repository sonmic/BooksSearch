import React from "react";
import Search from "./Search";
import axios from "axios";

export default class Saved extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    axios
      .get("/api/books")
      .then(response => this.setState({ books: response.data }))
      .catch(error => alert(error));
  }

  render() {
    return (
      <div className="savedContainer">
        <Search books={this.state.books} />
      </div>
    );
  }
}
