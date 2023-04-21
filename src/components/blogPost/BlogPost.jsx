import React from 'react'
import classes from './blogPost.module.css'
import moment from 'moment'
import { Col, Image } from 'react-bootstrap'
import img1 from '../../assets/blog4.jpg'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const BlogPost = ({ val }) => {

    const { link } = useSelector((state) => state.link)


    return (
        <Col lg="4"  >
            <div className={classes.contentbox}>
                <div className={classes.imgContainer}>
                    {
                        val.poto === undefined || val.poto === "" ?
                            <img className={classes.img} fluid src={img1} />
                            :
                            <img className={classes.img} fluid src={`${link}/images/${val.poto}`} />

                    }
                </div>
                <p className={classes.date}> {moment(val.createdAt).format('dddd')}   {moment(val.createdAt).format("LL")}</p>
                <h2 className={classes.heading}>
                    <Link className={classes.link} to={`/post/${val._id}`}>  {val.title}  </Link>
                </h2>
                <p className={classes.para}>
                    <p className={classes.para}>
                        {val.desc.length > 50 ?
                            <span>{val.desc.slice(0, 80)}... <Link to={`/post/${val._id}`}>Read More</Link></span>
                            : val.desc
                        }
                    </p>
                </p>
            </div>
        </Col>

    )
}

export default BlogPost
