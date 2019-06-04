import React, { useState, useEffect } from 'react'
import './admin.css'
import { withRouter } from 'react-router-dom'
import { backend } from '../config'

const checkAuth = func => {
    fetch(`${backend}/authrequired`, {
        method: 'GET',
        credentials: 'include',
        redirect: 'follow',
    })
        .then(res => res.json())
        .then(result => func(result.status))
        .catch(error => console.error('Error', error))
}
function AdminLogin(props) {
    const [status, setStatus] = useState(false)

    useEffect(() => {
        checkAuth(setStatus)
    }, [])

    return (
        <div className="main_admin">
            {!status && <LoginForm toggleLogin={setStatus} />}
            {status && <AdminPage toggleLogin={setStatus} />}
        </div>
    )
}

const form_background = {
    background: 'rgba(255, 255, 255)',
}

const postData = (url, json, func) => {
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => func(response.ok))
        .catch(error => console.error('Error', error))
}

function AdminPage(props) {
    const [title, setTitle] = useState('')
    const [img_path, setImg_path] = useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')
    const [type, setType] = useState('')
    const [date, setDate] = useState('')

    const resetStates = () => {
        setTitle('')
        setImg_path('')
        setDescription('')
        setLink('')
        setType('')
        setDate('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        postData(
            `${backend}/newproject`,
            {
                title,
                img_path,
                description,
                link,
                type,
                date,
            },
            arg => {}
        )
        resetStates()
    }
    const logout = () => {
        fetch(`${backend}/logout`, {
            method: 'GET',
            credentials: 'include',
            redirect: 'follow',
        }).then(props.toggleLogin(false))
    }
    const handleInputChange = e => {
        const id = e.target.id
        const value = e.target.value
        switch (id) {
            case 'title':
                setTitle(value)
                break
            case 'img_path':
                setImg_path(value)
                break
            case 'description':
                setDescription(value)
                break
            case 'link':
                setLink(value)
                break
            case 'type':
                setType(value)
                break
            case 'date':
                setDate(value)
                break
            // no default
        }
    }
    return (
        <div className="loginform" style={form_background}>
            <form className="s12" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="input-field col s12">
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="title"> Tittel </label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input
                            id="img_path"
                            type="text"
                            value={img_path}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="img_path">
                            {' '}
                            Navn på bildet med filending{' '}
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input
                            id="description"
                            type="text"
                            value={description}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="description"> Beskrivelse </label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input
                            id="link"
                            type="text"
                            value={link}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="link"> Full link </label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input
                            id="type"
                            type="text"
                            value={type}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="type">
                            {' '}
                            Type (prosjekt, jobb, engasjement)
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input
                            id="date"
                            type="text"
                            value={date}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="date"> Dato(YYYY-MM-DD) </label>
                    </div>
                </div>
                <button type="submit" className="waves-effect waves-light btn">
                    Submit
                </button>
            </form>
            <button
                type="button"
                className="waves-effect waves-light btn"
                onClick={logout}
            >
                Log out
            </button>
            <Button />
        </div>
    )
}
const Button = withRouter(({ history }) => (
    <button
        type="button"
        onClick={() => {
            history.push('/')
        }}
    >
        Go home
    </button>
))

function LoginForm(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [submit, setSubmit] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()
        setSubmit(true)
        postData(
            `${backend}/login`,
            {
                username: username,
                password: password,
            },
            props.toggleLogin
        )
    }

    const error = <h1 className="error"> Wrong credentials </h1>

    const handleInputChange = e => {
        e.preventDefault()
        const id = e.target.id
        const value = e.target.value
        switch (id) {
            case 'username':
                setUsername(value)
                break
            case 'password':
                setPassword(value)
                break
            default:
                break
        }
    }

    return (
        <div className="loginform" style={form_background}>
            {submit && error}
            <form className="s12" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="input-field col s12">
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="username"> Username </label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="username"> Password </label>
                    </div>
                </div>
                <button type="submit" className="waves-effect waves-light btn">
                    Login to admin page
                </button>
            </form>
        </div>
    )
}

export default AdminLogin
