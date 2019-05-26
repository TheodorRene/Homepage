import React, {useState, useEffect} from 'react'
import "./admin.css"
const backend = "http://localhost:8000"

const checkAuth = (func) => {
    fetch(`${backend}/authrequired`,{
        method: 'GET',
        credentials: 'include',
        redirect: 'follow',
    }).then(res => res.json()).then(result => {
        func(result.status)
    })
        .catch(error => console.error('Error',error))
}
function AdminLogin(props){

    const [status,setStatus] = useState(false)

    useEffect(() => {
        checkAuth(setStatus)
    },[])
     
    return(
        <div className="main_admin">
            {!status && <LoginForm toggleLogin={setStatus}/>}
            {status && <AdminPage  toggleLogin={setStatus}/>}
        </div>
    )
}

const form_background = {
  background: "rgba(255, 255, 255)",
}

const postData = (url, json, func) => {
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(json),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(response => {func(response.ok)})
}

function AdminPage(props) {
    const [title,setTitle] = useState("")
    const [img_path,setImg_path] = useState("")
    const [description,setDescription] = useState("")
    const [link,setLink] = useState("")
    const [type,setType] = useState("")
    const [date,setDate] = useState("")

    const handleSubmit = () =>{
        return
    }
    const logout = () => {
        fetch(`${backend}/logout`,{
            method: 'GET',
            credentials: 'include',
            redirect: 'follow',
        }).then( () => props.toggleLogin(false))
    }
    const handleInputChange = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        switch(id){
            case "title": setTitle(value); break;
            case "img_path": setImg_path(value); break;
            case "description": setDescription(value); break;
            case "link": setLink(value); break;
            case "type": setType(value); break;
            case "date": setDate(value); break;
                // no default
        }
    }
    return(
        <div className="loginform" style={form_background}>
            <form class="s12" onSubmit={handleSubmit}>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="title" type="text" value={title} onChange={handleInputChange} />
                        <label htmlFor="title"> Tittel </label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="img_path" type="text" value={img_path} onChange={handleInputChange}/>
                        <label htmlFor="img_path"> Navn på bildet </label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="description" type="text" value={description} onChange={handleInputChange}/>
                        <label htmlFor="description"> Beskrivelse </label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="link" type="text" value={link} onChange={handleInputChange}/>
                        <label htmlFor="link"> Name of image </label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="type" type="text" value={type} onChange={handleInputChange}/>
                        <label htmlFor="type"> Type </label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="date" type="text" value={date} onChange={handleInputChange}/>
                        <label htmlFor="date"> Dato </label>
                    </div>
                </div>
                <button type="submit" class="waves-effect waves-light btn">Login to admin page</button>
            </form>
                <button type="button" class="waves-effect waves-light btn" onClick={logout}>Log out</button>
        </div>
    )
}

function LoginForm(props){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        postData(`${backend}/login`,{
            "username": username,
            "password": password,
        },props.toggleLogin)
    }
    
    const handleInputChange = (e) => {
        e.preventDefault()
        const id = e.target.id
        const value = e.target.value
        switch(id){
            case "username": setUsername(value); break;
            case "password": setPassword(value); break;
            default: break;
        }
    }

    return(
        <div className="loginform" style={form_background}>
            <form class="s12" onSubmit={handleSubmit}>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="username" type="text" value={username} onChange={handleInputChange} />
                        <label htmlFor="username"> Username </label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="password" type="text" value={password} onChange={handleInputChange}/>
                        <label htmlFor="username"> Password </label>
                    </div>
                </div>
                <button type="submit" class="waves-effect waves-light btn">Login to admin page</button>
            </form>
            <button type="button" onClick={checkAuth} class="waves-effect waves-light btn">Test authentication</button>
        </div>
    )
}

export default AdminLogin 
