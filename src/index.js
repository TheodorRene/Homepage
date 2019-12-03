import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'

import './css/index.css'
import Navbar from './components/navbar'
import SuperHome from './landingpage'
import CurriculumBooks from './curr_books/books'
import AdminLogin from './admin/admin_index'
import Blog from './blog/blog'

ReactDOM.render(
    <Router>
        <Navbar />
        <Switch>
            <Route exact path="/" component={SuperHome} /> <Route exact path="/curr" component={CurriculumBooks} />
            <Route path="/admin" component={AdminLogin} />
            <Route path="/blog" component={Blog}/>
        </Switch>
    </Router>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
