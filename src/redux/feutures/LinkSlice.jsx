import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    link: import.meta.env.VITE_ADD_Link,
}
const LinkSlice = createSlice({
    name: 'link',
    initialState,
    reducers: {

    }
})



export default LinkSlice.reducer