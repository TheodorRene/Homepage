const express = require('express')
const app = express()
const port = 8000
const bodyParser = require('body-parser')
const Pool = require('pg').Pool
const cors = require('cors')


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

app.get('/', (req, res) => getAllBooks(req,res))
//app.get('/test', (req, res) => res.json({ info: 'Node.js, Express, and Postgres API' }))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const getAllBooks = (req, res) => {
    pool.query('SELECT * FROM books', (err,results) => {
        if(err){
            throw err
        }
    res.status(200).json(results.rows)
    })
}

