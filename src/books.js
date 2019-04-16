import React, { Component } from "react";

class CurriculumBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ["book1", "book2"]
    };
    this.handleNewBook = this.handleNewBook.bind(this);
  }
  handleNewBook = (book) => {
    this.setState(() => {
      return {
        list: this.state.list.push(book)
      };
    });
  };

  render() {
    return (
      <div>
        <h1> CurriculumBooks </h1>
        <AllBooks books={this.state.list} newbook={this.handleNewBook} />
      </div>
    );
  }
}

class AllBooks extends Component {
  constructor(props) {
    super(props);
    this.listOfBooks = this.listOfBooks.bind(this);
  }
  newbook = book => {
    this.props.newbook(book);
  };

  listOfBooks = books => {
    return books.map(book => {
      return <h1 key={book.toString()}>New {book}</h1>;
    });
  };

  render() {
    return (
      <div>
        {this.listOfBooks(this.props.books)}
        <newBook />
      </div>
    );
  }
}

class newBook extends Component {
    render(){
        return (
            <h1>Button</h1>
        );
    };
}

export default CurriculumBooks;
