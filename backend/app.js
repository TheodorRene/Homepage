const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const { exec } = require('child_process');
const db = require('./db_func')

//Config
const port = 8000
//End config

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)



app.get('/', (req,res) => db.getAllBooks(req,res))
//New book
app.post('/newbook', (req,res) => db.addBook(req,res))
//Delete book from database
app.post('/delbook', (req,res) => db.delBook(req,res))
// Update sellprice for book
app.post('/setsold', (req,res) => db.setSold(req,res))

// todo make function
app.listen(port, () => {
    console.clear()
    console.log(`
    \n\n\n\n\n\n\n\n\n\n\n\n
    currbooks📚 backend running on port ${port}🔥`)
    exec('figlet CB.backend', (err,stdout,stderr) => {
    console.log(`${stdout}`)
    })
})








