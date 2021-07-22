import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from 'axios'

const setUsers = createAsyncThunk('SET_USERS', () => {
    return axios.get('http://localhost:3001/api/users').then(res => res.data)
})

const usersReducer = createReducer([], {
    [setUsers.fulfilled]: (state, action) => action.payload
})

export {usersReducer, setUsers}