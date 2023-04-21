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

const Write = () => {

    const { user } = useSelector((state) => state.auth)
    const { link } = useSelector((state) => state.link)
    const [isLoding, setisLoding] = useState(false)


    let myFormik = useFormik({
        initialValues: {
            title: "",
            desc: "",
            file: null,
            username: user?.username
        },
        validate: (values) => {
            let err = {}



            if (!values.title) {
                err.title = "Enter Title in Your blog "
            }
            if (values.title.length < 5) {
                err.title = "minumam 5 letters "
            }

            if (!values.desc) {
                err.desc = "Fill the description "
            }
            if (values.desc.length < 25) {
                err.desc = "minumam 25 letters "
            }
            if (!values.file) {
                err.file = "Upload one image in Your Blog"
            }

            return err
        },

        onSubmit: async (values) => {

            const file = myFormik.values.file
            if (file) {

                const data = new FormData();
                const filename = Date.now() + file.name;
                data.append("name", filename);
                data.append("file", file);
                myFormik.values.poto = filename;

                try {

                    await axios.post(`${link}/upload`, data);
                } catch (err) { }
            }
            try {
                setisLoding(true)
                const res = await axios.post(`${link}/post/create`, values);
                window.location.replace("/post/" + res.data._id);
            } catch (err) { }
        }
    })



    return (
        <>
            {
                user ?
                    <div className={classes.container}>
                        <h3>Write Your Blog</h3>
                        <div className={classes.imgContainer}>
                            {myFormik.values.file && (
                                <img className={""} src={URL.createObjectURL(myFormik.values.file)} alt="" />
                            )}
                            {/* <img src={img} /> */}
                        </div>
                        <div className={classes.frombox}>
                            <form onSubmit={myFormik.handleSubmit}>
                                <Row >
                                    <Col md='12'>

                                        <label htmlFor="fileInput">
                                            <FcAddImage className={classes.imglogo} />

                                        </label>
                                        <input
                                            name='file'
                                            type="file"
                                            id="fileInput"
                                            accept='image/*'
                                            onChange={(e) =>
                                                myFormik.setFieldValue('file', e.currentTarget.files[0])}
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