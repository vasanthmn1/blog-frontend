import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/header/Header'
import classes from './mainpage.module.css'
import { useSelector } from 'react-redux'
const MainPage = () => {


    return (
        <div>
            <Header />
            <div className={classes.mainpage}>
                <Outlet />
            </div>
        </div>
    )
}

export default MainPage
