import React, { useEffect } from 'react'
import { useState } from "react";
import classes from './write.module.css'
import axios from "axios";
import { useSelector } from 'react-redux';
import { FcAddImage } from 'react-icons/fc'
import { useFormik } from 'formik';
import { Col, Row } from 'react-bootstrap';
import img from '../../assets/blog2.jpg'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Write = () => {

    const { user } = useSelector((state) => state.auth)
    const { link } = useSelector((state) => state.link)
    const [isLoding, setisLoding] = useState(false)


    let myFormik = useFormik({
        initialValues: {
            title: "",
            desc: "",
            poto: null,
            username: user?.username
        },
        validate: (values) => {
            let err = {}



            if (!values.title) {
                err.title = "Enter Title in Your blog "
            }
            if (values.title.length < 3) {
                err.title = "minumam 3 letters "
            }

            if (!values.desc) {
                err.desc = "Fill the description "
            }
            if (values.desc.length < 5) {
                err.desc = "minumam 25 letters "
            }
            if (!values.poto) {
                err.poto = "Upload one image in Your Blog"
            }

            return err
        },

        onSubmit: async (values) => {
            try {
                setisLoding(true)
                const res = await axios.post(`${link}/post/create`,
                    {
                        title: values.title,
                        poto: {
                            public_id: values.poto.name,
                            url: values.poto
                        },
                        desc: values.desc,
                        username: values.username
                    },

                );
                setisLoding(false)

                window.location.replace("/post/" + res.data._id);

            } catch (error) {
                toast.error(error)
                toast.error("Maximum 5kb image upload")

                if (error.response) {
                    console.log('Server Error:', error.response.data);
                    toast.error(error.response.data)
                } else {
                    console.log('Request Error:', error.message);
                    toast.error(error.response)

                }
                setisLoding(false)
                // toast.error('Server Error:', error.response.data)
            }


        }
    })
    const handleImage = (e) => {
        const file = e.target.files[0];
        setFileToBase(file);
        console.log(file);
    }

    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            myFormik.setFieldValue("poto", reader.result)
        }

    }


    return (
        <>
            {
                user ?
                    <div className={classes.container}>
                        <ToastContainer />
                        <h3>Write Your Blog</h3>
                        <div className={classes.imgContainer}>
                            {myFormik.values.poto ? (
                                <img

                                    src={myFormik.values.poto}
                                    alt={myFormik.values.title}
                                />
                            ) : <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjl3C3TaTxwJToSwA6E4EGA1rlotxVf7XAmFIKNugGpQ&s' />}
                        </div>
                        <div className={classes.frombox}>
                            <form onSubmit={myFormik.handleSubmit}>
                                <Row >
                                    <Col md='12'>

                                        <label htmlFor="fileInput">
                                            <FcAddImage className={classes.imglogo} />

                                        </label>
                                        <input
                                            name="poto"
                                            type="file"
                                            id="fileInput"
                                            accept='image/*'
                                            onChange={handleImage}
                                        />
                                        <p className={classes.warring}>{myFormik.errors.file && myFormik.touched.file ? myFormik.errors.file : null}</p>
                                    </Col>
                                    <Col md='6'>
                                        <input
                                            name='title'
                                            type="text"
                                            placeholder="Title"
                                            className={classes.titleInput}
                                            autoFocus={true}
                                            onChange={myFormik.handleChange}
                                        />
                                        <p className={classes.warring}>{myFormik.errors.title && myFormik.touched.title ? myFormik.errors.title : null}</p>
                                    </Col>
                                    <Col lg='12' >

                                        <textarea
                                            rows="8"

                                            name='desc'

                                            className={myFormik.errors.desc && myFormik.touched.desc ? classes.descInputWarinng : classes.descInput}
                                            onBlur={myFormik.handleBlur}
                                            placeholder={"Tell your story..."}

                                            type="text"


                                            onChange={myFormik.handleChange}
                                        ></textarea>
                                        <p className={classes.warring}>{myFormik.errors.desc && myFormik.touched.desc ? myFormik.errors.desc : null}</p>

                                        <button
                                            disabled={isLoding}

                                            className={classes.btn} type="submit">
                                            {
                                                isLoding ?
                                                    "Loadind...." :
                                                    "Submit"
                                            }
                                        </button>
                                    </Col>
                                </Row>

                            </form>
                        </div>
                    </div> : <div className={classes.container}>
                        <h3>  Create Your Profile Next You Create Your Blog</h3>
                        <Link to={'/login'} style={{ textDecoration: 'none', fontSize: '1.2rem' }}>Login</Link>
                    </div>
            }
        </>
    )
}

export default Write