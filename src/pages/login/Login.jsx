import React, { useEffect, useState } from 'react'
import classes from './login.module.css'

import { useFormik } from 'formik'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginStart, loginSuccess } from '../../redux/feutures/AuthSlice'
const Login = () => {
    const { link } = useSelector((state) => state.link)
    const { user } = useSelector((state) => state.auth)

    const navigater = useNavigate()
    const dispatch = useDispatch()
    const [err, setErr] = useState(false)
    let myFormik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
        },
        validate: (values) => {
            let err = {}

            if (!values.email) {
                err.email = "Enter full email"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                err.email = 'Invalid email address !!';
            }
            if (!values.password) {
                err.password = "Enter password"
            }
            return err
        },

        onSubmit: async (values) => {
            setErr(false)
            dispatch(loginStart())
            try {
                const res = await axios.post(`${link}/auth/login`, values)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                console.log(res.data.user);
                dispatch(loginSuccess(res.data.user))
                navigater('/')
            } catch (error) {
                console.log(error);

                setErr(toast.error('Email or Password wrong'))
            }
        }
    })
    useEffect(() => {

    }, [user])
    return (
        <div className={classes.container}>
            <ToastContainer />
            <div className={classes.warper}>
                <h4> Login</h4>
                <form className={classes.form} onSubmit={myFormik.handleSubmit}>
                    <label>Email:</label>
                    <input
                        className={
                            myFormik.errors.email && myFormik.touched.email ? classes.warinng : classes.success}
                        onBlur={myFormik.handleBlur}
                        onChange={myFormik.handleChange}
                        type='text'
                        placeholder={myFormik.errors.email && myFormik.touched.email ? myFormik.errors.email : "Enter Full Email.."}

                        value={myFormik.values.email}
                        name='email'
                    />
                    <span className={classes.emailSpan}>  {myFormik.errors.email && myFormik.touched.email ? myFormik.errors.email : null} </span>
                    <label>Password:</label>
                    <input
                        className={
                            myFormik.errors.password && myFormik.touched.password ? classes.warinng : classes.success}
                        autoComplete="on"
                        name='password'
                        onBlur={myFormik.handleBlur}
                        onChange={myFormik.handleChange}
                        type='password'

                        value={myFormik.values.password}
                        placeholder={myFormik.errors.password && myFormik.touched.password ? myFormik.errors.password : "Enter Password"}

                    />
                    {err && <p style={{ color: "red", paddingTop: "10px" }}>somting Worong !!!!</p>}

                    <p className={classes.loginlink}>
                        Already have a account?
                        <Link to={'/register'}>
                            register now
                        </Link>
                    </p>

                    <div className={classes.btn}>
                        <button type='submit' >


                            Login
                        </button>
                    </div>
                </form>
            </div>



        </div>
    )
}

export default Login