import React from 'react'
import styles from "../CSScomponents/profile.module.scss"

function Profile(props) {


    return (
        <div className={styles.Profile}>

        <div className={styles.intro}>

            <h1>Welcome {props.name}</h1>
        </div>


        <p>Member Benefits</p>
            
        </div>
    )
}

export default Profile
