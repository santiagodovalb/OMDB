import React from 'react';
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import Movies from '../containers/Movies'

function Search() {

    const [movies, setMovies] = useState([])

    const {input} = useParams();

    useEffect(() => {
        axios
      .get(`https://www.omdbapi.com/?apikey=20dac387&s=${input}`)
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