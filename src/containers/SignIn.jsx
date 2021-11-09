import React from "react";
import useSignIn from "../hooks/useSignIn";
function SignIn() {

  const {handleChange, handleSubmit, failedLog} = useSignIn()

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