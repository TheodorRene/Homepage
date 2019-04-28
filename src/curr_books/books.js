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
      year: "1997",
      buy_price: "199",
      sell_price: "-1",
    },
    {
      title: "Matte 1",
      author: "God",
      year: "0",
      buy_price: "500",
      sell_price: "-1",
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
    this.setSold = this.setSold.bind(this);
  }
  //Add book
  handleNewBook = (book) => {
    this.setState(prevState => ({
      books: [...this.state.books, book]
    }))
  };

    setSold = (book,price) => {
        let newState = Object.assign({}, this.state);

        console.log(newState.books)
        for(var i = 0; i < newState.books.length; i++) {
            var obj = newState.books[i];
            if (obj.title===book.title){
                newState.books[i].sell_price=price
                this.setState(newState)
                break;
            }
        }
    }

  render() {
    return (
        <div className="super_main_books">
            <h1 class="white-text center-align" > <i class="fas fa-book"></i> CurriculumBooks </h1>
            <div className={this.state.className}>
                <AllBooks books={this.state.books} newbook={this.handleNewBook} setSold={this.setSold} />
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
    this.ToggleNewBookPrice = this.ToggleNewBookPrice.bind(this);
    this.isSold = this.isSold.bind(this)
      this.state = {
          className: "leftside",
          hiddenNewBookPrice: true,
      }
  }

  newbook = book => {
    this.props.newbook(book);
  };

  // Currently toggles newbookprice for every card
  ToggleNewBookPrice = () =>{
      this.setState({
          hiddenNewBookPrice: !this.state.hiddenNewBookPrice,
      })
  }

  isSold = (book) => book.sell_price!=="-1"

  listOfBooks = () => {
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
                {this.isSold(book) && 
                        <p> 
                            Sell price: {book.sell_price} <br></br>
                            Diff: {parseInt(book.buy_price) - parseInt(book.sell_price)}
                        </p>
                }
              </div>
                <NewBookPrice book={book} hidden={this.state.hiddenNewBookPrice} setSold={this.props.setSold} />
          </div>
          {this.isSold(book) &&  <span class="new badge blue"data-badge-caption="Sold"></span> }
      </div>
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

// Button for setting sold price
function NewBookPrice(props){

  const [price,setPrice] = useState("")
  const [hidden,setHidden] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault()
        props.setSold(props.book,price)
        ToggleNewBookPrice()
        setPrice("")
    }

    const handleInputChange = (e) => {
        setPrice(e.target.value)
    }
    const ToggleNewBookPrice = () =>{
        setHidden(!hidden)
    }

    if (!hidden){
    return( 
        <div className="new-book-price">
            <form class="s12" onSubmit={handleSubmit}>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="newPrice" type="text" value={price} onChange={handleInputChange} />
                        <label htmlFor="newPrice">{props.book.title}</label>
                    </div>
                    <div >
                        <button type="submit" class="waves-effect waves-light btn">Add sell price</button>
                    </div>
                    <div>
                        <button type="button" class="waves-effect waves-light btn" onClick={ToggleNewBookPrice}>Mark as sold</button> 
                    </div>
                </div>
            </form>
        </div>
    )
    } else {
        return(
        <div class="card-action">
            <button type="button" class="waves-effect waves-light btn" onClick={ToggleNewBookPrice}>Mark as sold</button> 
        </div>
        )
    }
}



//Form for adding new book
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
      "buy_price": "${price}",
      "sell_price": "-1"
    }`))
    setTitle("")
    setAuthor("")
    setYear("")
    setPrice("")
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
