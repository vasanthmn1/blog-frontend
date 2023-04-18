import React, { useState } from 'react'
import classes from './register.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {

    const { link } = useSelector((state) => state.link)
    const [err, setErr] = useState(false)
    const navigater = useNavigate()
    let myFormik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
        },
        validate: (values) => {
            let err = {}
            if (!values.username) {
                err.username = "Fill Full Name"
            }
            if (!values.email) {
                err.email = "Enter full email"
            }
            if (!values.password) {
                err.password = "Enter password"
            }
            return err
        },

        onSubmit: async (values) => {
            setErr(false)
            try {
                const res = await axios.post(`${link}/auth/register`, values)

                res.data && navigater('/login')
                console.log(res);
            } catch (error) {
                setErr(true)
            }

        }
    })
    return (
        <div className={classes.container}>
            <div className={classes.warper}>
                <h4> Register</h4>
                <form className={classes.form} onSubmit={myFormik.handleSubmit}>
                    <label>Username:</label>
                    <input
                        className={
                            myFormik.errors.username && myFormik.touched.username ? classes.warinng : classes.success}
                        name='username'
                        onBlur={myFormik.handleBlur}
                        onChange={myFormik.handleChange}
                        type='text'
                        placeholder={myFormik.errors.username && myFormik.touched.username ? myFormik.errors.username : "Enter Username"}

                        value={myFormik.values.username}
                    />
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
                        <Link to={'/login'}>
                            Login now
                        </Link>
                    </p>

                    <div className={classes.btn}>
                        <button type='submit'>Register</button>
                    </div>

                </form>
            </div>



        </div>
    )
}

export default Register
