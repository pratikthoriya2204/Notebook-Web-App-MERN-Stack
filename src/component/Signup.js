import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' });

  const handleSubmit = async (e) => {

    e.preventDefault();
    const { name, email, password } = credentials;

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);

    if (json.Success) {
      localStorage.setItem('token', json.authToken);
      props.showALert("Account Crated successfully","success");
      navigate('/');
    } else {
      props.showALert("Invalid Credentials","danger");
    }


  }

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='mt-5'>
      <h2>SignUp :-</h2>
      <form onSubmit={handleSubmit}>
        <div className="mt-5">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onchange} />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onchange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onchange} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' value={credentials.cpassword} onChange={onchange} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
