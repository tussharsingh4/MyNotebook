import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = (props) => {

    //const [email, setEmail] = useState("")
    //const [password, setPassword] = useState("")
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const history = useNavigate()

    const handleSubmit = async (e) => {

        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })  //yaha pe define karne ke liye likhte hai aise

        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            //redirect
            localStorage.setItem('token', json.authToken)
            props.showAlert("Successful Login", "Success")
            history("/home")

        }
        else {
            props.showAlert("Wrong credentials", "Danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })  //jo bhi value is note ke andar hai wo rahe par jo bhi yaha likhe jaa rahe hai unhe add ya override kardo
    }

    return (
        <div>
            <h2>Login to continue to MyNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="exampleInputEmail1" name="email" aria-describedby="emailHelp" onChange={onChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="exampleInputPassword1" name="password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary my-3" >Submit</button>
            </form>
        </div>
    )
}

export default Login