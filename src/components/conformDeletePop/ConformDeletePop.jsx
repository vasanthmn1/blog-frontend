import React from 'react'
import classes from './conformDeletePop.module.css'
const ConformDeletePop = ({ children }) => {
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                {children}
            </div>
        </div>
    )
}

export default ConformDeletePop