import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import About from '../pages/about/About'
import MainPage from '../pages/MainPage/MainPage'
import SiglePostPage from '../components/siglePostPage/SiglePostPage'
import Register from '../pages/register/Register'
import Login from '../pages/login/Login'
import { useSelector } from 'react-redux'
import Write from '../pages/write/Write'


const Router = () => {

    return (
        <div>
            <Routes>
                <Route path='/' element={<MainPage />}   >
                    <Route path='/' element={<Navigate to="/home" />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='about' element={<About />} />
                    <Route path='write' element={<Write />} />


                    <Route path='post/:id' element={<SiglePostPage />} />

                    {/* <Navigate to="home" replace /> */}
                </Route>
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />

            </Routes>
        </div>
    )
}

export default Router
