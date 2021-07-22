import React from 'react';
import Movies from '../containers/Movies'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'

function User() {

    const [user, setUser] = useState({})

    const {id} = useParams()
    
    useEffect(() => {
        axios.get(`http://localhost:3001/api/users/${id}`)
        .then(res => res.data)
        .then(user => setUser(user))
        .catch(err => console.log(err))
    },[])

    return(
        <div>
            <h1 className='userTitle'>{user.username}</h1>
            {user.favorites?.length ? <Movies movies={user.favorites} /> : <h2 className='userTitle'>No favorites added</h2>}
        </div>
    )
}


export default User;