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

                        Share your story with the world. Stand
                        out with a professionally-designed blog
                        website that can be customized to fit
                        your brand. Build, manage, and
                        promote your blog with Squarespace’s
                        built-in suite of design and marketing
                        tools.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Banner