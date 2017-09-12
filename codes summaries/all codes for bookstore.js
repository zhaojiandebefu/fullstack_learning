filename: /src/components/app.js
import React from "react";
import { Component } from "react";

import BookList from "../containers/book-list";
import BookDetail from "../containers/book-detail";

export default class App extends Component {
  render() {
    return (
      <div>
        <BookList />
        <BookDetail />
      </div>
    );
  }
}
-----------------------------------------------------------------
filename: /src/containers/book_list.js
import React, { Component } from "react";
import { connect } from "react-redux";
import { selectBook } from "../actions/index";
import { bindActionCreators } from "redux";

class BookList extends Component {
  renderList() {
    return this.props.books.map(book => {
      return (
        <li
          key={book.title}
          onClick={() => this.props.selectBook(book)}
          className="list-group-item"
        >
          {book.title}
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  // Whatever is returned will show up as props
  // inside of BookList
  return {
    books: state.books
  };
}

// Anything returned from this function will end up as props
// on the BookList container
function mapDispatchToProps(dispatch) {
  // Whenever selectBook is called, the result shoudl be passed
  // to all of our reducers
  return bindActionCreators({ selectBook: selectBook }, dispatch);
}

// Promote BookList from a component to a container - it needs to know
// about this new dispatch method, selectBook. Make it available
// as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(BookList);
---------------------------------------------------------------------------------
filename: /src/containers/book_detail.js
import React, { Component } from "react";
import { connect } from "react-redux";

class BookDetail extends Component {
  render() {
    if (!this.props.book) {
      return <div>Select a book to get started.</div>;
    }

    return (
      <div>
        <h3>Details for:</h3>
        <div>Title: {this.props.book.title}</div>
        <div>Pages: {this.props.book.pages}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    book: state.activeBook
  };
}

export default connect(mapStateToProps)(BookDetail);

------------------------------------------------------------------------------------
filename: /src/reducers.index.js
import { combineReducers } from "redux";
import BooksReducer from "./reducer_books";
import ActiveBook from "./reducer_active_book";

const rootReducer = combineReducers({
  books: BooksReducer,
  activeBook: ActiveBook
});

export default rootReducer;
--------------------------------------------------------------
filename: /src/reducers/reducer_active_book.js
// State argument is not application state, only the state
// this reducer is responsible for
export default function(state = null, action) {
  switch (action.type) {
    case "BOOK_SELECTED":
      return action.payload;
  }

  return state;
}
-----------------------------------------------------------
filename: /src/reducers/reducer_books.js
export default function() {
  return [
    { title: "Javascript: The Good Parts", pages: 101 },
    { title: "Harry Potter", pages: 39 },
    { title: "The Dark Tower", pages: 85 },
    { title: "Eloquent Ruby", pages: 1 }
  ];
}
------------------------------------------------------------
filename: /src/actions/index.js
export function selectBook(book) {
  // selectBook is an ActionCreator, it needs to return an action,
  // an object with a type property.
  return {
    type: "BOOK_SELECTED",
    payload: book
  };
}
