import React, { useEffect, useState } from 'react'
import { Col, Container, Image, Modal, Row } from 'react-bootstrap'
import img from '../../assets/blog2.jpg'
import classes from './singlePage.module.css'
import { AiTwotoneEdit, AiFillDelete } from 'react-icons/ai'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import Sidebar from '../sidbar/Sidebar'
import ConformDeletePop from '../conformDeletePop/ConformDeletePop'
const SiglePostPage = () => {
    const [pop, SetPop] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const { link } = useSelector((state) => state.link)

    const { user } = useSelector((state) => state.auth)
    // const User = user.user
    console.log(user);
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()


    const [data, setData] = useState({})
    useEffect(() => {
        getdata()
    }, [])


    const getdata = async () => {
        setIsLoading(true);
        try {
            const data = await axios.get(`${link}/post/${params.id}`)
            setData(data.data)
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    }
    console.log(data);
    const handelDelete = async () => {

        try {
            const del = await axios.delete(`${link}/post/delete/${params.id}`, {
                data: { username: user.username }
            })
            console.log(del);
            getdata()
            navigate('/')
        } catch (error) {

        }
    }
    return (
        <div className={classes.full}>
            {
                isLoading ?
                    <img src='https://media.giphy.com/media/l0K3ZgnBpH8eKUPug/giphy.gif' />
                    :


                    <Container className={classes.container}>
                        <Row>
                            <Col md="12" >

                                <div>
                                    <img className={classes.img} src={`${link}/images/${data.poto}`} fluid alt='img' />
                                </div>
                            </Col>
                            <Col md="12">
                                <div className={classes.box1}>
                                    <h1>
                                        {data && data.title}
                                    </h1>
                                    {
                                        user?.username === data.username && (
                                            <div>

                                                <AiFillDelete
                                                    onClick={() => SetPop(true)}
                                                    title='delete'
                                                    className={classes.delete} />
                                            </div>
                                        )
                                    }

                                </div>
                                <div className={classes.box2}>
                                    <h4>Writer :
                                        <Link className={classes.link} to={`/home/?user=${data.username}`}> {data && data.username}</Link>
                                    </h4>
                                    <h6 className={classes.time}>{moment(data && data.createdAt).endOf('').fromNow()}</h6>
                                </div>
                            </Col>

                            <Col md='12'>
                                <div className={classes.descbox}>
                                    <p className={classes.para}>
                                        {data && data.desc}
                                    </p>
                                </div>

                            </Col>


                        </Row>
                        {
                            pop ?
                                <ConformDeletePop>
                                    <div className={classes.logoutbox}>
                                        <h5> conform Delete Post</h5>
                                        <div className={classes.logoutbtn}>

                                            <h5 className={classes.logoutDel}
                                                onClick={handelDelete}
                                            >Delete</h5>
                                            <h5 className={classes.logoutChannel}
                                                onClick={() => SetPop(false)}
                                            >channel</h5>

                                        </div>

                                    </div>
                                </ConformDeletePop>
                                : null
                        }
                    </Container>
            }
        </div>
    )
}

export default SiglePostPage
