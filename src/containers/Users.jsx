import { useSelector } from 'react-redux'
import React from 'react';
import { Link } from 'react-router-dom'
import LittleMovies from './LittleMovies'
import { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { setUsers } from "../state/users";


function Users() {

    const dispatch = useDispatch();
    const users = useSelector(state => state.users)

    useEffect(() => {
        dispatch(setUsers());
    }, [])

    return(
        <div className='users'>
            {users.map(user => {
                return (
                <div>
                <Link to={`/users/${user.id}`}>
                <h1>{user.username}</h1>
                </Link>
                {user.favorites.length > 0 ? <LittleMovies movies={user.favorites} /> : <h3>- No favorites added</h3>}
                </div>
                )
            })}
        </div>
    )
}

export default Users