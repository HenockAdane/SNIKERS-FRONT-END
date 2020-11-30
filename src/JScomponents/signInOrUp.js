import React from 'react'
import SignIn from './signIn'
import SignUp from './signUp'
import styles from "../CSScomponents/signInOrUp.module.css"

function SignInOrUp() {
    return (
        <div className={styles.signInOrUp}>

        <SignIn />
        <SignUp />
            
        </div>
    )
}

export default SignInOrUp
