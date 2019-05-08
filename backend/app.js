const express = require('express')
const app = express()
const port = 8000
const bodyParser = require('body-parser')
const Pool = require('pg').Pool
const cors = require('cors')
const { exec } = require('child_process');

//app.use(function(req, res, next) {
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  next();
//});
app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)



const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'currbooks',
  password: '123tre!!',
  port: 5432,
})

const getAllBooks = (req, res) => {
    pool.query('SELECT * FROM books', (err,results) => {
        if(err){
            throw err
        }
    res.status(200).json(results.rows)
    })
}

app.get('/', (req,res) => getAllBooks(req,res))
//app.get('/test', (req, res) => res.json({ info: 'Node.js, Express, and Postgres API' }))

app.listen(port, () => {
    console.clear()
    console.log(`
    \n\n\n\n\n\n\n\n\n\n\n\n
    currbooks📚 backend running on port ${port}🔥`)
    exec('figlet CB.backend', (err,stdout,stderr) => {
    console.log(`${stdout}`)
    })
})

app.post('/newbook', (req,res) => addBook(req,res))

const addBook = (req, res) => {
    const book = req.body
    pool.query('INSERT INTO books (title,author,year,buyprice,sellprice) VALUES ($1, $2, $3, $4,$5)',
        [book.title, book.author, book.year, book.buyprice, book.sellprice], (err,results) => {
            if(err)
                throw err
         res.status(201).send(`Book has been added to database`)
        })
}



