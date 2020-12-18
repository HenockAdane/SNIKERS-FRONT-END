import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {addUser} from "../ReduxComponents/userReducer"
import styles from "../CSScomponents/confirmationPage.module.scss"




function ConfirmationPage() {

    const dispatch = useDispatch()

    let currentUser = useSelector(state => state.userReducer.currentUser)


    const [state, setState] = useState(() => ({
        attemptedConfirmationCode: ""
    }))

    const inputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setState(ps => ({
            ...ps,
            [name]: value,
        }))

        console.log(value)

    }

    const formSubmit = (e) => {
        e.preventDefault()
        fetch(`${process.env.REACT_APP_API}confirmation`, {
            method: "POST",
            mode:"cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({currentUser: currentUser, attemptedConfirmationCode: state.attemptedConfirmationCode, attemptedDate: new Date().getTime()})
        }).then(res => res.json()).then(data => {

            if (data.user && data.user.confirmed){
                alert(data.message)
                dispatch(addUser(data.user))
            }

            else{
                console.log(data)
                alert(data.message)
            }


        })
    }

    const resendCode = (e) => {
        console.log("resend clicked")
        e.preventDefault()
        fetch(`${process.env.REACT_APP_API}resendConfirmationCode`, {
            method: "POST",
            mode:"cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(currentUser)
        }).then(res => res.json()).then(data => {
            alert(data.message)

        })
    }

    return (
        <div className={styles.confirmationPage}>


        


        <div className={styles.formContainer}>

            <h1>Thank You For Creating An Account</h1>
            <p>We Have Sent The Confirmation Code To The Email: {currentUser.email}</p>
            <form className={styles.form} onSubmit={formSubmit}>
                <input type="text" name="attemptedConfirmationCode" required onChange={inputChange} value={state.attemptedConfirmationCode} placeholder="Enter Confirmation Code" />
                <input className={styles.submitBtn} type="submit" name="submitBtn" value="Confirm" />
            </form>

                <button className={styles.resendBtn} onClick={resendCode}>RESEND CODE</button>
        </div>
        </div>
    )
}

export default ConfirmationPage
