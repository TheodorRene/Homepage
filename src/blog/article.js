import React, { useState } from 'react'
import { Remarkable } from 'remarkable';
import ReactMarkdown from 'react-markdown';

import './blog.css'

function Article(props){
    const md = new Remarkable();
    return (
        <div className="article">
            <h1> {props.article.title} </h1>
                <ReactMarkdown source={props.article.text}/>
        </div>
    )
}

export default Article
