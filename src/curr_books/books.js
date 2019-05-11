import React, { Component, useState } from "react";
import "./books.css"
//Setting up a rest api with express and postgres
//https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8

//TODO refactor code, split into more files

const main_child = {
  background: "rgba(255, 255, 255)",
}


//Main class
class CurriculumBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: null,
      className: "main_books",
    };
    this.handleNewBook = this.handleNewBook.bind(this);
    this.setSold = this.setSold.bind(this);
    this.postData = this.postData.bind(this);

  }
    componentDidMount() {
        fetch('http://localhost:8000/')
            .then(response => response.json())
            .then(books => this.setState({ books }));
    }

  handleNewBook = (book) => {
    this.setState(prevState => ({
      books: [...this.state.books, book]
    }))
  };

    setSold = (book,price) => {
        let newState = Object.assign({}, this.state);

        // TODO remove this paragraph, there has to be a better way. Graphql?
        for(var i = 0; i < newState.books.length; i++) {
            var obj = newState.books[i];
            if (obj.title===book.title){
                newState.books[i].sellprice=price
                this.setState(newState)
                break;
            }
        }
    }

    //TODO make postdata global function, make helper file with functions
    postData = (url, json) => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(json),
            headers:{
                'Content-Type': 'application/json'
            }
        }
        )
            .then(res => console.log(res))
            .catch(error => console.error('Error:', error));
    }

    render() {
        return (
            <div className="super_main_books">
                <h1 class="white-text center-align" > <i class="fas fa-book"></i> CurriculumBooks </h1>
                <div className={this.state.className}>
                        {this.state.books && <AllBooks books={this.state.books} newbook={this.handleNewBook} setSold={this.setSold} />}
                        {!this.state.books && <h1> Backend error </h1> } 
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

  isSold = (book) => book.sellprice!==-1

  listOfBooks = () => {
    return this.props.books.map(book => {
      return (
        <div key={book.bookid} class="col s12 m7">
          <h2 class="header white-text">{book.title}</h2>
          <div class="card horizontal">
            <div class="card-image">
              <img
                src="https://picsum.photos/200/300"
                alt="picutre"
              />
            </div>
            <div class="card-stacked">
              <div class="card-content">
                <p>Author: {book.author}</p>
                <p>Price: {book.buyprice}</p>
                <p>Year: {book.year}</p>
                {this.isSold(book) && 
                        <p> 
                            Sell price: {book.sellprice} <br></br>
                            Diff: {parseInt(book.sellprice) - parseInt(book.buyprice)}
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

    const handleSubmitDB =  (e) => {
        e.preventDefault()
        postData("http://localhost:8000/setsold",{
            "bookid": props.book.bookid,
            "sellprice": price
        })
        props.setSold(props.book,price)
        ToggleNewBookPrice()
        setPrice("")
    }

    // TODO Delete
    const postData = (url, json) => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(json),
            headers:{
                'Content-Type': 'application/json'
            }
        }
        )
    .then(res => console.log(res))
        .catch(error => console.error('Error:', error));
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
            <form class="s12" onSubmit={handleSubmitDB}>
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
      //TODO rewrite
    newBook(JSON.parse(`{
      "title": "${title}",
      "author": "${author}",
      "year": "${year}",
      "buyprice": "${price}",
      "sellprice": -1
    }`))
    setTitle("")
    setAuthor("")
    setYear("")
    setPrice("")
  }
  const handleSubmitDB = (e) => {
      e.preventDefault()
      postData(`http://localhost:8000/newbook`, {
          "title": title,
          "author": author,
          "year": year,
          "buyprice": price,
          "sellprice": -1
      })
  }

    //TODO remove
    const postData = (url, json) => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(json),
            headers:{
                'Content-Type': 'application/json'
            }
        }
        )
    .then(res => console.log(res))
        .catch(error => console.error('Error:', error));
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
      <form class="s12" onSubmit={handleSubmitDB}>
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
