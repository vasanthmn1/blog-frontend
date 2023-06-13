import React, { useEffect, useState } from 'react'
import classes from './profile.module.css'
import axios from "axios";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

const Profile = () => {

    const { link } = useSelector((state) => state.link)
    const { user } = useSelector((state) => state.auth)
    const [getData, setGetData] = useState({})
    const [isloading, setisloading] = useState(false)

    const getuser = async () => {
        if (user) {
            setisloading(true)
            let data = await axios.get(`${link}/user/${user._id}`)

            setGetData(data.data.user)
            setisloading(false)

        }
    }
    useEffect(() => {
        getuser()
    }, [])

    console.log(getData);


    return (
        <>
            {
                isloading ? <Loader /> :
                    user ?
                        <div className={classes.container}>
                            <ToastContainer />
                            <div className="">
                                <Row className={classes.contantbox} >
                                    <Col md='12' className={classes.box}>
                                        <div className={classes.heading}>
                                            <h2 className={classes.user}>
                                                Username:      <span>        {getData.username}</span>
                                            </h2>
                                            <h2 className={classes.user}>
                                                Eamil:<span>{getData.email}</span>
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
