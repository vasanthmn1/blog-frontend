import { createSlice } from '@reduxjs/toolkit'





const initialState = {
    data: []
}
const LinkSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        addData: (state, action) => {
            state.data = action.payload
        },
    }
})


export const { addData } = LinkSlice.actions

export default LinkSlice.reducer