import React from 'react'
import classes from './logout.module.css'
const Logout = ({ children }) => {
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                {children}
            </div>
        </div>
    )
}

export default Logout