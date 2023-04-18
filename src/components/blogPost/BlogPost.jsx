import React from 'react'
import classes from './blogPost.module.css'
import moment from 'moment'
import { Col, Image } from 'react-bootstrap'
import img1 from '../../assets/blog4.jpg'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const BlogPost = ({ val }) => {
    // console.log(`${val.poto}`);
    const a = JSON.stringify(val.poto)
    const { link } = useSelector((state) => state.link)


    return (

        <Col lg="6" className={classes.col}>
            <div className={classes.contentbox}>
                <div>
                    <Image className={classes.img} fluid src={`${link}/images/${val.poto}`} />
                </div>
                <p className={classes.date}> {moment(val.createdAt).format('dddd')}   {moment(val.createdAt).format("LL")}</p>
                <h2 className={classes.heading}>
                    <Link to={`/post/${val._id}`}>  {val.title}  </Link>
                </h2>
                <p className={classes.para}>
                    {val.desc}
                </p>
            </div>
        </Col>

    )
}

export default BlogPost
