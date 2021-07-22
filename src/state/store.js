import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './user'
import { usersReducer } from './users'

const store = configureStore( {
    reducer: {
        user: userReducer,
        users: usersReducer
    }
})

export default store