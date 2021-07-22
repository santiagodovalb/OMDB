import React from "react";
import { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../state/user'

function SignIn() {

  const [state, setState] = useState({
    username: '',
    password: ''
  })

  const dispatch = useDispatch();
  const users = useSelector(state => state.users)

  const [failedLog, setFailedLog] = useState(false)

  const history = useHistory()

  const handleChange = (e) => {
    setState({...state, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {

    e.preventDefault();
    
      axios.post("/api/sign-in", {
        username: state.username,
        password: state.password,
      })
      .then(user => {dispatch(setUser(user.data))
      history.push(`/users/${user.data.id}`)})
      .catch(err => {
      console.log(err)
      setFailedLog(true)
      })
    }

    // const user = users.filter(user => user.username === state.username && user.password === state.password)[0]
    
    // if (user) {
    //   dispatch(setUser(user))
    //   history.push(`/users/${user.id}`)
    // }

    // else setFailedLog(true)
  

  return (
    <div className='sign'>
    <h1>Sign In</h1>
    <span id='failedLog'>{failedLog ? `Credentials don't match` : ''}</span>
    <form onSubmit={handleSubmit} className='signForm'>
      <label>- Username</label>
        <input onChange={handleChange} type='text' name='username'></input>
      <label>- Password</label>
        <input onChange={handleChange} type='password' name='password'></input>
        <button type='submit' className='formSubmit'>Submit</button>

    </form>
    </div>
  );
}

export default SignIn