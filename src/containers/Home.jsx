import React from "react";
import Movies from "./Movies";
import { useState, useEffect } from "react";
import axios from "axios";
require('dotenv').config()
const { REACT_APP_API_KEY } = process.env

function Home() {
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    const movie1 = axios
      .get(`https://www.omdbapi.com/?apikey=343de2e6&i=tt7282468`)
      .then(res => res.data)

    const movie2 = axios
      .get(`https://www.omdbapi.com/?apikey=343de2e6&i=tt0268126`)
      .then(res => res.data)

      const movie3 = axios
      .get(`https://www.omdbapi.com/?apikey=343de2e6&i=tt0088680`)
      .then(res => res.data)

      const movie4 = axios
      .get(`https://www.omdbapi.com/?apikey=343de2e6&i=tt8637428`)
      .then(res => res.data)

      const movie5 = axios
      .get(`https://www.omdbapi.com/?apikey=343de2e6&i=tt0175880`)
      .then(res => res.data)

    Promise.all([movie1, movie2, movie3, movie4, movie5])
    .then(movies => setMovies(movies))

  }, []);

  return (
    <div>
      <div className="home">
        <h1 className="homeTitle">Your favorite movies, all in one place</h1>
        <h6>____________________________________________</h6>
        <h3>
          Find all the information you need from our collection of thousands of
          movies
        </h3>
      </div>
      <div>
        <Movies movies={movies} />
      </div>
    </div>
  );
}

export default Home;
