import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import Banner from '../../components/banner/Banner'
import { Col, Container, Image, Row } from 'react-bootstrap'
import classes from './home.module.css'

import img1 from '../../assets/blog4.jpg'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { PostRequest, addData } from '../../redux/feutures/PostDataSlice'
import moment from 'moment/moment'
import BlogPost from '../../components/blogPost/BlogPost'
import Sidebar from '../../components/sidbar/Sidebar'
import Loader from '../../components/loader/Loader'




const Home = () => {

    const dispatch = useDispatch()
    const { search } = useLocation()
    const { link } = useSelector((state) => state.link)
    const { data, isLoading } = useSelector((state) => state.post)

    useEffect(() => {

        fetchData()
    }, [search])
    const fetchData = async () => {
        dispatch(PostRequest())
        const postdata = await axios.get(`${link}/post${search}`)
        dispatch(addData(postdata.data))
    }

    return (
        <div className={classes.container}>
            <Banner />
            <Container className={classes.box1} >
                {
                    isLoading ? <Loader /> :
                        <Row >

                            {/* <Row className={classes.contentRow}> */}
                            {
                                data.map((val, idx) => {
                                    return (
                                        <BlogPost val={val} key={idx} />

                                    )
                                })
                            }
                        </Row>
                }

            </Container>
        </div>
    )
}

export default Home
