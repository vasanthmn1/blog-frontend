import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import classes from './sidebar.module.css'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Sidebar = () => {

    const [cat, setCAt] = useState([])
    const { link } = useSelector((state) => state.link)

    useEffect(() => {
        getCat()
    }, [])


    const getCat = async () => {
        const data = await axios.get(`${link}/categorie`)
        setCAt(data.data)
    }

    return (

        <Col lg="3" >
            <div className={classes.sidebar}>
                <div className={classes.sidebarItem}>
                    <hr />
                    <span className={classes.sidebarTitle}>ABOUT ME</span>
                    <hr />
                    <img
                        src="https://i.pinimg.com/236x/1e/3f/58/1e3f587572a7a7b20bbf1828595a1786--holiday-party-themes-holiday-gift-guide.jpg"
                        alt=""
                    />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate qui
                        necessitatibus nostrum illum reprehenderit.
                    </p>
                </div>
                <div className={classes.sidebarItem}>
                    <span className={classes.sidebarTitle}>CATEGORIES</span>
                    <ul className={classes.sidebarList}>
                        {cat.map((c, idx) => (
                            <Link to={`/home/?cat=${c.name}`} className="link" key={idx}>
                                <li className={classes.sidebarListItem}>{c.name}</li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </Col>

    )
}

export default Sidebar