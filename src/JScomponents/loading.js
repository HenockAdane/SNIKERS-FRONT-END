import React from 'react'
import styles from "../CSScomponents/loading.module.scss"

function Loader(props) {


    let loaderContainerStyles = [
        {
            minHeight: "65vh"
        },{
            top: 0,
            position: "fixed",
            zIndex: 1000,
            backgroundColor:"rgba(60, 60, 60, 0.4)"
        }
    ]
    return (
        <div className={styles.loaderContainer} style={props.fullScreen ? loaderContainerStyles[1] : loaderContainerStyles[0]}>
            <div className={styles.loader}></div>
        </div>
    )
}

export default Loader
