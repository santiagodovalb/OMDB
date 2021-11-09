import React from 'react';
import useSingleMovie from '../hooks/useSingleMovie';
require('dotenv').config()

function SingleMovie() {

    const {handleAdd, handleRemove, movie, user} = useSingleMovie()

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