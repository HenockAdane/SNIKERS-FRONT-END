import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {addUser} from "../ReduxComponents/userReducer"
import styles from "../CSScomponents/confirmationPage.module.scss"
import Loader from './loading';
import { Redirect } from 'react-router-dom';





function ConfirmationPage() {

    const dispatch = useDispatch()

    let currentUser = useSelector(state => state.userReducer.currentUser)


    const [state, setState] = useState(() => ({
        attemptedConfirmationCode: "",
        loading: false,
        errorMessage: ""
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

        setState(ps => ({
            ...ps,
            loading: true
        }))

        fetch(`${process.env.REACT_APP_API}confirmation`, {
            method: "POST",
            mode:"cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({currentUser: currentUser, attemptedConfirmationCode: state.attemptedConfirmationCode, attemptedDate: new Date().getTime()})
        }).then(res => {

            if (res.status === 200){
                return res.json()
            }

            setState(ps => ({
                ...ps,
                errorMessage: "There Was An Unexpected Error, Please Try Again"
            }))

            setInterval(() => {
                setState(ps => ({
                    ...ps,
                    errorMessage: ""
                }))
                
            }, 5000);

        }).then(data => {

            setState(ps => ({
                ...ps,
                loading: false
            }))

            if (data.user && data.user.confirmed){
                setState(ps => ({
                    ...ps,
                    errorMessage: data.message
                }))
                dispatch(addUser(data.user))
                localStorage.setItem("snikersUser", JSON.stringify(data.user))
            }

            else{
                setState(ps => ({
                    ...ps,
                    errorMessage: data.message
                }))

                setTimeout(()=>{
                    setState(ps => ({
                        ...ps,
                        errorMessage: ""
                    }))
    
                }, 5000);

            }


        })
    }

    const resendCode = (e) => {
        console.log("resend clicked")
        e.preventDefault()

        setState(ps => ({
            ...ps,
            loading: true
        }))

        fetch(`${process.env.REACT_APP_API}resendConfirmationCode`, {
            method: "POST",
            mode:"cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(currentUser)
        }).then(res => {

            if (res.status === 200){
                return res.json()
            }

            else{
                setState(ps => ({
                    ...ps,
                    errorMessage: "There Was An Unexpected Error, Please Try Again"
                }))

                setTimeout(()=>{
                    setState(ps => ({
                        ...ps,
                        errorMessage: ""
                    }))
    
                }, 5000);
            }

        }).then(data => {

            dispatch(addUser(data.user))
            localStorage.setItem("snikersUser", JSON.stringify(data.user))

            setState(ps => ({
                ...ps,
                loading: false,
                errorMessage: data.message
            }))

            setTimeout(()=>{
                setState(ps => ({
                    ...ps,
                    errorMessage: ""
                }))

            }, 5000);


        })
    }

    return (
        currentUser ? (<div className={styles.confirmationPage}>

            {state.loading ? <Loader fullScreen={true} /> : false}
    
    
            
    
    
            <div className={styles.formContainer}>
    
                <h1>Thank You For Creating An Account</h1>
                <p>To Fully Use This Account, Please Confirm The Confirmation Code Sent To The Email: {currentUser.email}</p>
                <form className={styles.form} onSubmit={formSubmit}>
                    <input type="text" name="attemptedConfirmationCode" required onChange={inputChange} value={state.attemptedConfirmationCode} placeholder="Enter Confirmation Code" />

                    {state.errorMessage ? (<p style={{color: "red"}}><em>{state.errorMessage}</em></p>) : false}

                    <input className={styles.submitBtn} type="submit" name="submitBtn" value="Confirm" />
                </form>
    
                    <button className={styles.resendBtn} onClick={resendCode}>RESEND CODE</button>
            </div>
            </div>) : (<Redirect to="/" />)
    )
}

export default ConfirmationPage
