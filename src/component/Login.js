import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {

        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json);
        if (json.Success) {
            localStorage.setItem('token', json.authToken);
            props.showALert("Login successfully", "success")
            navigate('/');
        } else {
            props.showALert("Invalid Detail", "danger")
        }

    }
    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='mt-5'>
            <h2>Log In :-</h2>
            <form onSubmit={handleSubmit}>
                <div className="my-5">
                    <label htmlFor="email" className="form-label">UserName:</label>
                    <input type="email" className="form-control" name="email" id="email" value={credentials.email} onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" name='password' id="password" value={credentials.password} onChange={onchange} />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}
