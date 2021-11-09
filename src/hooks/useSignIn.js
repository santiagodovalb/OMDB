import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../state/user";

export default function useSignIn() {
  const dispatch = useDispatch();

  const history = useHistory();

  const [failedLog, setFailedLog] = useState(false)

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/sign-in", {
        username: state.username,
        password: state.password,
      })
      .then((user) => {
        alert('Sign in exitoso')
        dispatch(setUser(user.data));
        history.push(`/users/${user.data.id}`);
      })
      .catch((err) => {
        console.log(err);
        setFailedLog(true);
      });
  };

  return { handleChange, handleSubmit, failedLog };
}
