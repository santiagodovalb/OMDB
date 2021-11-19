import React from 'react';
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import Movies from '../components/Movies'
const { REACT_APP_API_KEY } = process.env

function Search() {

    const [movies, setMovies] = useState([])

    const {input} = useParams();

    useEffect(() => {
        axios
      .get(`https://www.omdbapi.com/?apikey=${REACT_APP_API_KEY}&s=${input}`)
      .then(res => res.data)
      .then(moviesList => setMovies(moviesList.Search))
    }, [movies])


    return (
        <div>
            <Movies movies={movies}/>
        </div>
    )
}

export default Search