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
import ConformDeletePop from '../conformDeletePop/conformDeletePop'
const SiglePostPage = () => {
    const [pop, SetPop] = useState(false)

    const { link } = useSelector((state) => state.link)

    const { user } = useSelector((state) => state.auth)
    const User = user.user

    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()


    const [data, setData] = useState({})
    useEffect(() => {
        getdata()
    }, [])


    const getdata = async () => {
        const data = await axios.get(`${link}/post/${params.id}`)
        setData(data.data)
    }
    console.log(data);
    const handelDelete = async () => {

        try {
            const del = await axios.delete(`${link}/post/delete/${params.id}`, {
                data: { username: User.username }
            })
            console.log(del);
            getdata()
            navigate('/')
        } catch (error) {

        }
    }
    return (
        <Container className={classes.container}>
            <Row>
                <Col md="9" >
                    <div>
                        <Image src={`${link}/images/${data.poto}`} fluid alt='img' />
                        <div className={classes.box1}>
                            <h1>
                                {data && data.title}
                            </h1>
                            {
                                User.username === data.username && (
                                    <div>
                                        <AiTwotoneEdit
                                            title='edit'
                                            className={classes.edit} />
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
                                <Link to={`/home/?user=${data.username}`}> {data && data.username}</Link>
                            </h4>
                            <h6 className={classes.time}>{moment(data && data.createdAt).endOf('day').fromNow()}</h6>
                        </div>
                        <div>
                            <p className={classes.para}>
                                {data && data.desc}
                            </p>
                        </div>
                    </div>
                </Col>
                {/* ! side bar */}
                <Sidebar />

            </Row>
            {
                pop ?
                    <ConformDeletePop>
                        <div className={classes.logoutbox}>
                            <h5> conform logot your account</h5>
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
    )
}

export default SiglePostPage
