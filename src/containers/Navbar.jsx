import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../state/user";
import axios from 'axios'

function Navbar() {
  const history = useHistory();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    input: "",
  });

  const handleChange = (e) => {
    setForm({
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${form.input}`);
  };

  const handleSignOut = async () => {
    try {
      await axios.post("/api/sign-out");
      dispatch(setUser({}));
      history.push("/home");
    } catch (err) {
      console.log(err);
    }
  };

  const inputEl = useRef()

  const inputWidth = () => {
    inputEl.current.focus();  
  }

  return (
    <div className="navbar">
      <Link to="/home">
        <h2 className="navTitle">OMDB</h2>
      </Link>
      
      {!user.id ? (
        <div className="navLinks">
            <Link to="/users">
            <p className='sign'>Users</p>
            </Link>
            <p>|</p>
          <Link to="/sign-in">
            <p className="sign">Sign in</p>
          </Link>
          <p>|</p>
          <Link to="/sign-up">
            <p className="sign">Sign up</p>
          </Link>
          <p>|</p>
          <Link to="/about">
          <p>About</p>
          </Link>
        </div>
      ) : (
        <div className="navLinks">
            <Link to="/users">
            <p className='sign'>Users</p>
            </Link>
            <p>|</p>
          <Link to={`/users/${user.id}`}>
            <p className="sign">{user.username}</p>
          </Link>
          <p>|</p>
          <Link to="/home">
            <p onClick={handleSignOut} className="sign">
              Sign out
            </p>
          </Link>
          <p>|</p>
          <Link to="/about">
          <p>About</p>
          </Link>
        </div>
      )}
      
      <form className="navForm" onSubmit={handleSubmit}>
      <img onClick={inputWidth} className='lupa' src='https://www.clipartmax.com/png/full/279-2795130_search-magnifying-glass-search-icon-transparent.png' alt='searchImg' />
        <input
          name="input"
          id='search'
          ref={inputEl}
          onChange={handleChange}
          className="navInput"
          type="text"
          placeholder="Search by title"
        ></input>
      </form>
    </div>
  );
}

export default Navbar;
