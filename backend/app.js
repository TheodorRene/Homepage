//https://medium.com/@evangow/server-authentication-basics-express-sessions-passport-and-curl-359b7456003d
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const db_currbooks = require('./db_func')
const db_homepage = require('./homepage_db_func')

const uuid = require('uuid/v4')
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//const conf = require('./config')
//const bcrypt = require('bcrypt-nodejs'); // use this for hashed passwords

//Config
const port = 8000
//end config 
const users = [
  {id: '12', username: 'theodorc', password: 'test'}
]
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    return uuid() // use UUIDs for session IDs
  },
  store: new FileStore(),
  secret: 'racecar',
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    ( username, password, done) => {
        console.log('Inside local strategy callback')
        // here is where you make a call to the database
        // to find the user based on their username or email address
        // for now, we'll just pretend we found that it was users[0]
        const user = users[0]
        if(username === user.username && password === user.password) {
            console.log('Local strategy returned true')
            return done(null, user)
        }else{
            console.log("login failed")
            done(null,false)
        }
    }
));

passport.serializeUser((user, done) => {
    console.log('Inside serializeUser callback. User id is save to the session file store here')
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('Inside deserializeUser callback')
  console.log(`The user id passport saved in the session file store is: ${id}`)
  const user = users[0].id === id ? users[0] : false; 
  console.log(`user id deserializeUser: ${users[0].id}`)
  done(null, user);
});


app.get('/test', (req,res) => {
    console.log('Inside the homepage callback function')
    console.log(req.sessionID)
    res.send(`You hit home page!\n`)
})

// create the login get and post routes
app.get('/login', (req, res) => {
  console.log('Inside GET /login callback function')
  console.log(req.sessionID)
  res.send(`You got the login page!\n`)
})

//app.post('/login', (req, res, next) => {
//  console.log('Inside POST /login callback')
//  passport.authenticate('local', (err, user, info) => {
//    console.log('Inside passport.authenticate() callback');
//    console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
//    console.log(`req.user: ${JSON.stringify(req.user)}`)
//    console.log(`err: ${err}`)
//    console.log(`err: ${req.username}`)
//    if(info){ return res.send(info.message)}
//    if(err){ return next(err)}
//    if(!user){return res.redirect('/login')}
//    req.login(user, (err) => {
//        if (err) {return next(err)}
//        return res.redirect('/authrequired');
//    })
//  })(req, res, next);
//})
//
app.post('/login',
    passport.authenticate('local'),(req,res,next)=>{
        res.status(200)
    });

app.get('/authrequired', (req, res) => {
  if(req.isAuthenticated()) {
    console.log("Logged in: true")
    return res.json({"status":'true'})
  } else {
    console.log("Logged in: false")
    return res.json({"status":'false'})
  }
})





//Host static files
app.use('/static', express.static('public'))


//currbooks
app.get('/allbooks', (req,res) => db_currbooks.getAllBooks(req,res))
//New book
app.post('/newbook', (req,res) => db_currbooks.addBook(req,res))
//Delete book from database
app.post('/delbook', (req,res) => db_currbooks.delBook(req,res))
// Update sellprice for book
app.post('/setsold', (req,res) => db_currbooks.setSold(req,res))

//homepage
app.get('/allprojects', (req, res) => db_homepage.getAllProjects(req,res))


// todo make function
app.listen(port, () => {
    console.log(`
    \n\n\n\n\n\n\n\n\n\n\n\n
    currbooks📚 backend running on port ${port}🔥`)
})





