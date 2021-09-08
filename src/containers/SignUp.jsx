import React from "react";
import {useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import { setUsers } from "../state/users";

function SignUp() {

  const history = useHistory()
  const dispatch = useDispatch()

  const users = useSelector(state => state.users)

  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setState({...state, [e.target.name]: e.target.value})
  }

  const handlePassword = (e) => {
    const password = document.getElementById('passwordInput')
    const button = document.getElementById('signUpButton')
    
    if (e.target.value !== password.value) {
      e.target.setCustomValidity(`Passwords don't match`);
      e.target.reportValidity();
      button.disabled = true
    }
    else {
      button.disabled = false
      e.target.setCustomValidity('');
      setState({...state, password: e.target.value})
    }
  }

  const validate = (e) => {
    e.target.reportValidity()
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (users.some(index => index.username === state.username || index.email === state.email)) {
      document.getElementById('signUpSpan').innerHTML = 'Username or email already in use'
      return
    }
    axios.post('/api/users', state)
    .then(() => dispatch(setUsers()))
    .catch(res => console.log(res))
    history.push('/sign-in')
  }

  return (
    <div className='sign'>
    <h1>Sign Up</h1>
    <span id='signUpSpan'></span>
    <form onSubmit={handleSubmit} className='signForm'>
      <label>- Username</label>
        <input onChange={handleChange} onBlur={validate} type='text' name='username' required></input>
      <label>- Email</label>
        <input onChange={handleChange} onBlur={validate} type='email' name='email' required></input>
      <label>- Password</label>
        <input onBlur={validate} type='password' id='passwordInput' required></input>
      <label>- Confirm password</label>
        <input onChange={handlePassword} type='password' required></input>
      <button type='submit' className='formSubmit' id='signUpButton' disabled>Submit</button>
    </form>
    </div>
  );
}

export default SignUp