import React from "react";
import Search from "./Search";
import axios from "axios";

export default class Saved extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    axios
      .get("/api/books")
      .then(response => this.setState({ books: response.data }))
      .catch(error => alert(error));
  }

  render() {
    return (
      <div className="savedContainer">
        <Search
          showDeleteButton={true}
          books={this.state.books}
          onDelete={() => this.refresh()}
        />
      </div>
    );
  }
}
