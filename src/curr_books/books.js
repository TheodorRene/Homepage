import React, { Component, useState } from "react";
import "./books.css"

const main_child = {
//  display: "flex",
 // alignItems: "flex-start",
  background: "rgba(255, 255, 255)",
}



const curr_books = {
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

  ]
}

//Main class
class CurriculumBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: curr_books.books,
      className: "main_books"
    };
    this.handleNewBook = this.handleNewBook.bind(this);
  }
  //Add book
  handleNewBook = (book) => {
    this.setState(prevState => ({
      books: [...this.state.books, book]
    }))
  };

  render() {
    return (
        <div className="super_main_books">
            <h1 class="white-text center-align" > <i class="fas fa-book"></i> CurriculumBooks </h1>
            <div className={this.state.className}>
                <AllBooks books={this.state.books} newbook={this.handleNewBook} />
                <NewBook newBook={this.handleNewBook}/>
            </div>
      </div>
    );
  }
}

// Return all books from state of curriculumsbooks in card format
class AllBooks extends Component {
  constructor(props) {
    super(props);
    this.listOfBooks = this.listOfBooks.bind(this);
      this.state = {
          className: "leftside",
          hiddenNewBookPrice: true,
      }
  }

  newbook = book => {
    this.props.newbook(book);
  };

  listOfBooks = () => {
    console.log(this.props.books)
    //return Object.values(this.props.books).map(book => {
    return this.props.books.map(book => {
      return (
        <div key={book.title} class="col s12 m7">
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
          <NewBookPrice book={book} hidden={this.state.hiddenNewBookPrice}/>
        </div>
      );
    });
    };

  render(){
    return (
        <div className={this.state.className}>
           {this.listOfBooks()}
        </div>
    );
  };
}

function NewBookPrice(props){


    const handleSubmit = (e) => {
        console.log("Hei")
        e.preventDefault()
    }

    const handleInputChange = () => console.log("Hei2")

    return( this.props.hidden
      <div className="new-book-price">
      <form class="s12" onSubmit={handleSubmit}>
        <div class="row">
          <div class="input-field col s12">
            <input id="title" type="text" onChange={handleInputChange} />
            <label htmlFor="title">Title</label>
          </div>
        <button type="submit" class="waves-effect waves-light btn">Add new book</button>
        </div>
    </form>
    </div>
    )
}



//Supposed to be a function that returns button
function NewBook(props) {
  const [title,setTitle] = useState("")
  const [author,setAuthor] = useState("")
  const [year, setYear] = useState("")
  const [price,setPrice] = useState("")
  const [className,setClassName] = useState("rightside")

  const newBook = book => {
    props.newBook(book);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    newBook(JSON.parse(`{
      "title": "${title}",
      "author": "${author}",
      "year": "${year}",
      "buy_price": "${price}"
    }`))
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
    <div className={className} style={main_child}>
      <form class="s12" onSubmit={handleSubmit}>
        <div class="row">
          <div class="input-field col s12">
            <input id="title" type="text" value={title} onChange={handleInputChange} />
            <label htmlFor="title">Title</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="author" type="text" value={author} onChange={handleInputChange}/>
            <label htmlFor="author">Author</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="year" type="text" value={year} onChange={handleInputChange}/>
            <label htmlFor="year">Year</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="price" type="text" value={price} onChange={handleInputChange}/>
            <label htmlFor="price">Price</label>
          </div>
        </div>

        <button type="submit" class="waves-effect waves-light btn">Add new book</button>
      </form>
    </div>
  );
}

export default CurriculumBooks;
