import { createSlice } from '@reduxjs/toolkit'




const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
}


const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true
        },
        loginSuccess: (state, action) => {
            state.isLoading = true
            state.user = action.payload
        },
        loginFaluire: (state) => {
            state.isLoading = false
            state.isError = true
        },
        logout: (state, action) => {
            localStorage.removeItem('user')
        }
    }
})


export const { loginStart, loginSuccess, loginFaluire, logout } = AuthSlice.actions

export default AuthSlice.reducer