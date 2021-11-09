import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUsers } from "../state/users";

export default function useSignUp() {

    const history = useHistory();
    const dispatch = useDispatch();
  
    const users = useSelector((state) => state.users);
  
    const [state, setState] = useState({
      username: "",
      email: "",
      password: "",
    });
  
    const handleChange = (e) => {
      setState({ ...state, [e.target.name]: e.target.value });
    };
  
    const handlePassword = (e) => {
      const password = document.getElementById("passwordInput");
      const button = document.getElementById("signUpButton");
  
      if (e.target.value !== password.value) {
        e.target.setCustomValidity(`Passwords don't match`);
        e.target.reportValidity();
        button.disabled = true;
      } else {
        button.disabled = false;
        e.target.setCustomValidity("");
        setState({ ...state, password: e.target.value });
      }
    };
  
    function mailValidation(e) {
      var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/;
      var validate = re.test(e.target.value);
      if (!validate) {
        e.target.setCustomValidity("Please enter a valid email");
        e.target.reportValidity();
      }
      else {
        e.target.setCustomValidity("");
        handleChange(e)
      }
    }
  
    function userValidation(e) {
      var re = /[$&+,:;=?@#|'<>.^*()%!-]/
      var validate = re.test(e.target.value)
      if (validate) {
        e.target.setCustomValidity("Please enter a valid username");
        e.target.reportValidity();
      }
      else {
        e.target.setCustomValidity("");
        handleChange(e)
      }
    }
  
    function validate(e) {
      e.target.reportValidity();
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (
        users.some(
          (index) =>
            index.username === state.username || index.email === state.email
        )
      ) {
        document.getElementById("signUpSpan").innerHTML =
          "Username or email already in use";
        return;
      }
      axios
        .post("/api/users", state)
        .then(() => dispatch(setUsers()))
        .then(() => {
                alert('Registrado con éxito')
                history.push("/sign-in")
            })
        .catch((res) => console.log(res));
      
    };

    return {handleSubmit, handleChange, userValidation, mailValidation, handlePassword, validate}
}
