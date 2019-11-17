import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown';

import './blog.css'

function Article(props){
    const [isOpen, setIsOpen] = useState(false)
    const [btnText, setBtnText] = useState("Les")
    

    const handleButton = () => {
        setIsOpen(!isOpen)
        setBtnText(isOpen ? "Les" : "Lukk" )
    }
    return (
        <div className="article">
            <button className="waves-effect waves-light btn" onClick={handleButton}> {btnText} </button>
            <h1> {props.article.title} </h1>
                { isOpen && <ReactMarkdown source={props.article.text}/>}
        </div>
    )
}

export default Article
