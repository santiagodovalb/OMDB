import React from "react";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./containers/Home";
import { Route, Switch, Redirect } from "react-router-dom";
import SingleMovie from "./containers/SingleMovie";
import SignUp from "./containers/SignUp";
import SignIn from "./containers/SignIn";
import Search from "./containers/Search";
import User from "./containers/User";
import { useDispatch } from "react-redux";
import { setUsers } from "./state/users";
import { setUser } from "./state/user";
import axios from 'axios'
import Users from './containers/Users'
import About from './containers/About'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUsers());

    axios
      .get("/api/me")
      .then((res) => res.data)
      .then((user) => {
        dispatch(setUser(user));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <Switch>
          <Route path="/home" component={Home} />
          <Route
            path="/movies/:movieId"
            render={({ match }) => <SingleMovie movieId={match.params.id} />}
          />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/search/:input" render={() => <Search />} />
          <Route path="/users/:id" render={() => <User />} />
          <Route path='/users' component={Users} />
          <Route path='/about' component={About} />
          <Redirect to="/home" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
