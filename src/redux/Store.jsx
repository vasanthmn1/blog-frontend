import { configureStore } from "@reduxjs/toolkit";

import LinksSlice from "../redux/feutures/LinkSlice";
import PostDataSlice from "./feutures/PostDataSlice";
import AuthSlice from "./feutures/AuthSlice";




export const store = configureStore({
    reducer: {
        link: LinksSlice,
        post: PostDataSlice,
        auth: AuthSlice
        // goals: goalSlice
    },
})