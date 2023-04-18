import React from 'react'
import classes from './banner.module.css'
import img from '../../assets/blog1.jpg'

const Banner = () => {
    return (
        <div className={classes.container}>
            <div className={classes.imgbanner}>
                {/* <img src={img} /> */}
                <div className={classes.data}>
                    <h1>Create a blog.</h1>
                    <p>
                        Share your story with the world. Stand <br />
                        out with a professionally-designed blog<br />
                        website that can be customized to fit<br />
                        your brand. Build, manage, and<br />
                        promote your blog with Squarespace’s <br />
                        built-in suite of design and marketing<br />
                        tools.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Banner