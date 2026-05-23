import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';

const register = () => {

  const {loading,handleRegister} = useAuth();
const [userName , setUserName] = useState();
const[email,setEmail]= useState();
const[password,setPassword]=useState();
const navigate = useNavigate();
  
  const  handleSubmit=async (e)=>
{
  e.preventDefault();
  await handleRegister({userName,email,password});
  navigate("/");
}
if(loading)
{
  return (<main><h1>loading.....</h1></main>)
}
  return (
  <main>
  <div className="form-container">
    <h1>Register</h1>

    <form onSubmit={handleSubmit}>

         <div className="input-group">
        <label htmlFor="userName">Username</label>
        <input
          type="username"
          id="username"
          name="username"
          placeholder="Enter username"
          onChange={(e)=>{setUserName(e.target.value)}}
        />
      </div>

      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter email address"
          onChange={(e)=>{setEmail(e.target.value)}}
        />
      </div>

      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          onChange={(e)=>{setPassword(e.target.value)}}
        />
      </div>

      <button className="button primary-button">
        Register
      </button>

    </form>

    <p>Already have an account ? <Link to={"/login"}> Login </Link> </p>
  </div>
</main>
  )
}

export default register