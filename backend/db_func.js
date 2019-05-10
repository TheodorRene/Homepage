
const Pool = require('pg').Pool
//
//Config
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'currbooks',
  password: '123tre!!',
  port: 5432,
})
//end config

// retrieve all books
const getAllBooks = (req, res) => {
    pool.query('SELECT * FROM books', (err,results) => {
        if(err){
            throw err
        }
    res.status(200).json(results.rows)
    })
}

//add book to database
const addBook = (req, res) => {
    const book = req.body
    pool.query('INSERT INTO books (title,author,year,buyprice,sellprice) VALUES ($1, $2, $3, $4, $5)',
        [book.title, book.author, book.year, book.buyprice, book.sellprice], (err,results) => {
            if(err)
                throw err
         res.status(201).send(`Book has been added to database`)
        })
}


//Delete book from db based on bookid
//This has not been tested
const delBook = (req, res) => {
    const bookid = req.body.bookid
    const query = 'DELETE from books where bookid=$1'
    pool.query(query,[bookid], (err,results) => {
        if (err){throw err}
        res.status(200).send(`Book ${bookid} has been deleted from database`)
    })
}

//Set sellprice
const setSold = (req, res) => {
    const sellprice = req.body.sellprice
    const bookid = req.body.bookid
    const query = 'UPDATE books SET sellprice=$1 WHERE bookid=$2'

    pool.query(query, [sellprice, bookid], (err, results) => {
        if(err){throw err}
        res.status(201).send(`Book ${bookid} has been deleted`)
    })
}

//Exported functions
module.exports = {
    getAllBooks,
    addBook,
    delBook,
    setSold
}
