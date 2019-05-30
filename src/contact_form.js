import React, { useState } from "react";
import { FormEntry } from './utils'

function Contact(props){
    const style = {
        display: "flex",
        justifyContent: "center",
        margin: "10vw"
    }
    return(
        <div style={style}>
            {Contact_form()}
        </div>
    )
}

function Contact_form(props){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [text, setText] = useState("")
    const [submit, setSubmit] = useState(false)

    const form_background = {
        background: "rgba(255, 255, 255)",
    }


    const handleInputChange = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        switch(id){
            case "name": setName(value); break;
            case "email": setEmail(value); break;
            case "text": setText(value); break;
                // no default
        }
    }
    const submitted = () => {
        return (
            <h1> Melding sendt </h1>
        )
    }
        
    return (
        <div className="form" style={form_background} netlify>
            {submit && submitted()}
            <form className="s12">
                <FormEntry 
                    id="name" 
                    val={name}
                    onChange={handleInputChange}
                    text="Navn"
                    type="input"
                />
                <FormEntry 
                    id="email" 
                    val={email}
                    onChange={handleInputChange}
                    text="Din epost"
                    type="input"
                />
                <FormEntry 
                    id="text" 
                    val={text}
                    onChange={handleInputChange}
                    text="Melding"
                    type="input"
                />
                <FormEntry 
                    text="Send inn"
                    type="button"
                />
            </form>
        </div>
    )
}

export default Contact
