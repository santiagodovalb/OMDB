import React from 'react';
import {Link} from 'react-router-dom'

function LittleMovies({movies}) {
    return (
        
        <div className='littleMovies'>
            {movies ? movies.map(movie => {
                return (
                    <div>
                    <Link to={`/movies/${movie.imdbID}`}>
                    <img className='littlePosters' src={movie.Poster === 'N/A' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/495px-No-Image-Placeholder.svg.png' : movie.Poster} alt='movie poster' />
                    </Link>
                    </div>
                )
            }) : <h1>No matches found</h1>}
        </div>
    )
}

export default LittleMovies;