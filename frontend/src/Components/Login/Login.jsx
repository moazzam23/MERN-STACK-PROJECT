import React, { useState } from 'react'
import "./Login.css"
import { Typography,Button } from '@mui/material'
import { Link } from 'react-router-dom'
import {useDispatch} from "react-redux"
import { Loginuser } from '../../Actions/User'

const Login = () => {

    const[email, setEmail]= useState("");
    const[password, setPassword]= useState("");

    const dispatch= useDispatch();

    const loginhandler=(e)=>{
        e.preventDefault();

    dispatch(Loginuser(email,password));

    }

  return (
    <div className='login'>
        <form onSubmit={loginhandler} className='loginForm'>
        <Typography style={{padding:"2vmax"}} variant='h2' >Social Media Login</Typography>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your Email' required />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your Paasword' required />
          <Link to={"/forgot/password"} >
            <Typography>Forgot Password?</Typography>``
          </Link>
            <Button type='submit'>
                login
            </Button>
            <Link to={"/register"} >
            <Typography>New User?</Typography>
          </Link>
        </form>
    </div>
  )
}

export default Login