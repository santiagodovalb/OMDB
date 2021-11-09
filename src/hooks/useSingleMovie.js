import axios from 'axios';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {setUser} from '../state/user'

export default function useSingleMovie() {

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

    return {handleRemove, handleAdd, movie, user}
}
