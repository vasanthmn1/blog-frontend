import { createSlice } from '@reduxjs/toolkit'





const initialState = {
    data: [],
    isLoading: false,
}
const LinkSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        PostRequest(state, action) {
            state.isLoading = true
        },
        addData: (state, action) => {
            state.data = action.payload
            state.isLoading = false
        },
    }
})


export const { addData, PostRequest } = LinkSlice.actions

export default LinkSlice.reducer