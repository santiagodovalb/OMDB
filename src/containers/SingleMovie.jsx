import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {setUser} from '../state/user'
require('dotenv').config()

function SingleMovie() {

    const {movieId} = useParams()

    const [movie, setMovie] = useState({})

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        axios
      .get(`https://www.omdbapi.com/?apikey=343de2e6&i=${movieId}`)
      .then(res => res.data)
      .then(movie => setMovie(movie))
    }, [])

    const handleAdd = () => {
        axios.put(`/api/users/${user.id}`, {favorites: [...user.favorites, movie]})
        dispatch(setUser({...user, favorites: [...user.favorites, movie]}))
    }

    const handleRemove = () => {
        const favorites = [...user.favorites]
        const index = favorites.findIndex(index => index.imdbID === movie.imdbID)
        favorites.splice(index, 1)
        axios.put(`/api/users/${user.id}`, {favorites: favorites})
        dispatch(setUser({...user, favorites: favorites}))
    }    

    return(
        <div>
        <div className='singleMovie'>
            <div>
            <img className='singlePoster' src={movie.Poster} alt='movie poster'/>
            </div>
            <div>
                <ul className='singleMovieInfo'>
                <li>Title: {movie.Title}</li>
                <li>Year: {movie.Year}</li>
                <li>Cast: {movie.Actors}</li>
                <li>Director: {movie.Director}</li>
                <li>Genre: {movie.Genre}</li>
                <li>Country: {movie.Country}</li>
                </ul>
                <p className='moviePlot'>{movie.Plot}</p>
            </div>
        </div>
        {!user.id && <p className='singleP'>Log in to save your favorite movies</p>}
        {user.id && !user.favorites?.some(index => index.imdbID === movie.imdbID) && <button onClick={handleAdd} className='favButton'>Add to favorites</button>}
        {user.id && user.favorites?.some(index => index.imdbID === movie.imdbID) && <button onClick={handleRemove} className='favButton'>Remove from favorites</button>}
        </div>
    ) 
}

export default SingleMovie