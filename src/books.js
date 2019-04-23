import React, { Component, useState } from "react";

const books = {
  books: [
    {
      title: "Introduction to algorithms",
      author: "Lars saabye christensen",
      year: 1997,
      buy_price: 199
    },
    {
      title: "Matte 1",
      author: "God",
      year: 0,
      buy_price: 500
    },
    {
      title: "Fysikk 2",
      author: "God",
      year: 0,
      buy_price: 100
    },

  ]
}

const main_child = {
    //backgroundImage: `url(${water})`,
    background: "rgba(255, 255, 255)",
    filter: "blur(0px)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
    position: "relative",
}

//Main class
class CurriculumBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: books
    };
    this.handleNewBook = this.handleNewBook.bind(this);
  }
  //Add book
  handleNewBook = (book) => {
    this.setState({
      list: [...this.state.books, book]
    })
  };

  render() {
    return (
      <div>
        <h1 class="white-text"> CurriculumBooks </h1>
        <NewBook newBook={this.handleNewBook}/>
        <AllBooks books={this.state.list} newbook={this.handleNewBook} />
      </div>
    );
  }
}

// Return all books from state of curriculumsbooks in card format
class AllBooks extends Component {
  constructor(props) {
    super(props);
    this.listOfBooks = this.listOfBooks.bind(this);
  }
  newbook = book => {
    this.props.newbook(book);
  };

  listOfBooks = books => {
    return books.books.map(book => {
      return (
        <div class="col s12 m7">
          <h2 class="header white-text">{book.title}</h2>
          <div class="card horizontal">
            <div class="card-image">
              <img
                src="https://lorempixel.com/100/190/nature/6"
                alt="picutre"
              />
            </div>
            <div class="card-stacked">
              <div class="card-content">
                <p>Author: {book.author}</p>
                <p>Price: {book.buy_price}</p>
              </div>
              <div class="card-action">
                <a href="/">This is a link</a>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      this.listOfBooks(this.props.books)
    );
  }
}

//Supposed to be a function that returns button
function NewBook(props) {
  const [title,setTitle] = useState("")
  const [author,setAuthor] = useState("")
  const [year, setYear] = useState("")
  const [price,setPrice] = useState("")

  const newBook = book => {
    props.newBook(book);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    newBook({
      title: title,
      author: author,
      year: year,
      buy_price: price
    },)
  }
  const handleInputChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    switch(id){
      case "title": setTitle(value); break;
      case "author": setAuthor(value); break;
      case "year": setYear(value); break;
      case "price": setPrice(value); break;

      // no default
    }
  }
  return (
    <div style={main_child}>
      <form class="s12" onSubmit={handleSubmit}>
        <div class="row">
          <div class="input-field col s12">
            <input id="title" type="text" value={title} onChange={handleInputChange} />
            <label for="title">Title</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="author" type="text" value={author} onChange={handleInputChange}/>
            <label for="author">Author</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="year" type="text" value={year} onChange={handleInputChange}/>
            <label for="year">Year</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="price" type="text" value={price} onChange={handleInputChange}/>
            <label for="price">Price</label>
          </div>
        </div>

        <button type="submit" class="waves-effect waves-light btn">Add new book</button>
      </form>
    </div>
  );
}

export default CurriculumBooks;
