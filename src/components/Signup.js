import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })

    const history=useNavigate()

    const handleSubmit = async (e) => {
        const {name, email, password} = credentials;//destructuring kar rahe hai idhar pe

        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({name, email, password })  //abi destructuring karne ke baad idhar kia

        });
        const json = await response.json()
        console.log(json)
        if (json.success){
            //redirect
            localStorage.setItem('token', json.authToken)
            history("/home")
            props.showAlert("Successful Signup", "Success")
        }
        else {
            //alert("Invalid credential")
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })  //jo bhi value is note ke andar hai wo rahe par jo bhi yaha likhe jaa rahe hai unhe add ya override kardo
    }


    return (
        <div>
            <h2>Signup to use MyNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" onChange={onChange} name="name" placeholder="Enter name" />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={onChange} placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5}required placeholder="Password" />
                </div>

                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required placeholder="Password" />
                </div>

                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary my-3">Submit</button>
            </form>
        </div>
    )
}

export default Signup