import React, {useState} from 'react'

function AdminLogin(props){

    return(
        <LoginForm />
    )
}

const form_background = {
  background: "rgba(255, 255, 255)",
}

function LoginForm(props){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        console.log(`Username: ${username}\n Password: ${password}`)
    }
    const handleInputChange = (e) => {
        const id = e.target.id
        const value = e.target.value
        switch(id){
            case "username": setUsername(value); break;
            case "password": setPassword(value); break;
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
        </div>
    )
}

export default AdminLogin 
