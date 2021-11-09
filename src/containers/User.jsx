import React from 'react';
import Movies from '../containers/Movies'
import { useSelector } from 'react-redux';

function User() {

    const user = useSelector(state => state.user)
    
    return(
        <div>
            <h1 className='userTitle'>{user.username}</h1>
            {user.favorites?.length ? <Movies movies={user.favorites} /> : <h2 className='userTitle'>No favorites added</h2>}
        </div>
    )
}


export default User;