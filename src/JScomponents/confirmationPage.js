import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {addUser} from "../ReduxComponents/userReducer"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
  




function ConfirmationPage() {

    const dispatch = useDispatch()

    let currentUser = useSelector(state => state.userReducer.currentUser)


    const [state, setState] = useState(() => ({
        attemptedConfirmation: ""
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
        fetch(`http://localhost:3001/confirmation`, {
            method: "POST",
            mode:"cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({currentUser: currentUser, attemptedConfirmation: state.attemptedConfirmation})
        }).then(res => res.json()).then(data => {

            data.confirmed ? dispatch(addUser(data)) : alert("code is wrong, please try again")

        })
    }

    const resendCode = (e) => {
        e.preventDefault()
        fetch(`${process.env.REACT_APP_APPLICATIONAPI}resendConfirmationCode`, {
            method: "POST",
            mode:"cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(currentUser)
        }).then(res => res.json()).then(data => {
            console.log(data.confirmed)
            dispatch(addUser(data))

        })
    }

    return (
        <div>


        <form onSubmit={formSubmit}>
            <input type="text" name="attemptedConfirmation" required onChange={inputChange} value={state.attemptedConfirmation} placeholder="Enter Confirmation Code" />
            <input type="submit" name="submitBtn" value="Confirm" />
        </form>

            <input type="submit" name="resendCodeBtn" value="Resend Code" onClick={resendCode}/>
            
        </div>
    )
}

export default ConfirmationPage
