import React, { useEffect, useState } from 'react'
import classes from './profile.module.css'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { updateuser } from '../../redux/feutures/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import addimg from '../../assets/addimg.png'
import { Col, Row } from 'react-bootstrap';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Profile = () => {

    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const PF = "http://localhost:7000/images/"
    const { link } = useSelector((state) => state.link)
    const { user } = useSelector((state) => state.auth)
    const [getData, setGetData] = useState({})
    const getuser = async () => {
        if (user) {
            let data = await axios.get(`${link}/user/${user._id}`)

            setGetData(data.data.user)
        }
    }
    useEffect(() => {
        getuser()
    }, [])

    let myFormik = useFormik({
        initialValues: {
            userId: user?._id,
            file: ""
        },
        validate: (values) => {
            let err = {}
            if (!values.file) {
                err.file = "Please select an image file";
                toast.error('Not Update Your Profile pictures')
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
                myFormik.values.profilePic = filename;
                try {
                    const photo = await axios.post(`${link}/upload`, data);

                } catch (err) { }
            }
            try {
                const res = await axios.put(`${link}/user/${user._id}`, values,);
                console.log(res.data);
                localStorage.setItem('user', JSON.stringify(res.data))

                toast.success(' Profile pictures Update Success full')

                dispatch(updateuser(res.data))
                navigate('/')
            } catch (err) {

            }
        }
    })



    return (
        <>
            {
                user ?
                    <div className={classes.container}>
                        <ToastContainer />
                        <div className="">
                            <Row className={classes.contantbox} >
                                <Col md="4" lg='2'>
                                    <form
                                        className="settingsForm" onSubmit={myFormik.handleSubmit}>
                                        <label className={classes.profilelable}>Profile Picture</label>

                                        <div className={classes.img}>

                                            <img

                                                src={myFormik.values.file ?
                                                    URL.createObjectURL(myFormik.values.file) : PF + user.profilePic

                                                }
                                                alt=""
                                            />




                                            <input
                                                className={classes.imguploadinput}
                                                type="file"
                                                id="fileInput"
                                                onChange={(e) =>
                                                    myFormik.setFieldValue('file', e.currentTarget.files[0])}
                                            />
                                        </div>
                                        <button className={classes.btn}
                                            type='submit'
                                        >
                                            Update
                                        </button>
                                        <h4>

                                        </h4>
                                    </form>
                                </Col>
                                <Col md='6' className={classes.box}>
                                    <div className={classes.heading}>
                                        <h2 className={classes.username}>
                                            Username:<span>{getData.username}</span>
                                        </h2>
                                        <h2 className={classes.email}>
                                            Eamil: <span>{getData.email}</span>
                                        </h2>
                                    </div>
                                </Col>

                            </Row>
                        </div>
                        {/* <Sidebar /> */}
                    </div> :
                    <div className={""}>
                        <h3>  Create Your Profile Next You See Your Profile Page </h3>
                        <Link to={'/login'} style={{ textDecoration: 'none', fontSize: '1.2rem' }}>Login</Link>
                    </div>
            }
        </>
    );
}

export default Profile
