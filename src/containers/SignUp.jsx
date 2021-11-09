import React from "react";
import useSignUp from "../hooks/useSignUp";

function SignUp() {
 
  const {handleSubmit, handleChange, userValidation, mailValidation, handlePassword, validate} = useSignUp()

  return (
    <div className="sign">
      <h1>Sign Up</h1>
      <span id="signUpSpan"></span>
      <form onSubmit={handleSubmit} className="signForm">
        <label>- Username</label>
        <input
          onChange={handleChange}
          onBlur={userValidation}
          type="text"
          name="username"
          required
        ></input>
        <label>- Email</label>
        <input
        onChange={handleChange}
          onBlur={mailValidation}
          type="text"
          name="email"
          required
        ></input>
        <label>- Password</label>
        <input
          onBlur={validate}
          type="password"
          id="passwordInput"
          required
        ></input>
        <label>- Confirm password</label>
        <input onChange={handlePassword} type="password" required></input>
        <button type="submit" className="formSubmit" id="signUpButton" disabled>
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignUp;