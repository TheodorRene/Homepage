import React, { useState, useEffect } from 'react'
import Article from './article'
import { backend as backend_link } from '../config'
import './blog.css'

function Blog(props){
    return (
        <div className="blog">
            <Articles />
        </div>
    )
}

function Articles(props){
    const [articles, setArticles] = useState("")
    useEffect(() => {
        fetch(`${backend_link}/articles`)
            .then(response => response.json())
            .then(res => {
                setArticles(res.articles)
            })
    }, [])

    function getArticles(){
        return articles.map(article_ => {
            return(<Article key={article_.article_id} article={article_}/>)
        })
    }
    return(
        <div className="articles">
            {articles && getArticles()}
        </div>
    )
}

export default Blog
