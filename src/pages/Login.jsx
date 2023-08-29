import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../main';
import { toast } from 'react-hot-toast';
import axios from 'axios';


const Login = () => {

  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  if(isAuthenticated) return <Navigate to={'/'} />

  const submitHandler = async (e) => {

    setLoading(true);

    try {
      
      e.preventDefault();

      const { data } = await axios.post(`${server}/users/login`, {
        email,
        password
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
  
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);


    } catch (error) {

      toast.error(error.response.data.message);
      // console.log(error);
      setIsAuthenticated(false);
      setLoading(false);

    }
  }

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>

          <input type="email" placeholder='Email' value={email} onChange={(e) => {
            setEmail(e.target.value)}
          } required />

          <input type="password" placeholder='Password' value={password} onChange={(e) => {
            setPassword(e.target.value)}
          } required />

          <button disabled={loading} className="submit">Login</button>

          <h4>Or</h4>

          <Link disabled={loading} to="/register">Sign Up</Link>

        </form>
      </section>
    </div>
  )
}

export default Login