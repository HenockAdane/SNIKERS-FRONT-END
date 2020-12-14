import React, { useState } from 'react'
import styles from "../CSScomponents/settings.module.scss"
import { useSelector, useDispatch } from 'react-redux'
import { addUser } from '../ReduxComponents/userReducer'

function Settings() {

    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.userReducer.currentUser)

    const [state, setState] = useState(()=> ({
        email: currentUser.email,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        modalDisplay: ["none", "unset"]
    }))

    const deleteModalClose = () => {

        setState(ps => ({
            ...ps,
            modalDisplay: ps.modalDisplay.reverse()
        }))

        console.log("modal close")

    }

    const deleteModalOpen = () => {

        setState(ps => ({
            ...ps,
            modalDisplay: ps.modalDisplay.reverse()
        }))

        console.log("modal open")

    }

    const updateAccount = (e) => {
        e.preventDefault()
        if (state.newPassword.length >= 8 && state.newPassword === state.confirmNewPassword){

            fetch(`${process.env.REACT_APP_API}settings`, {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: state.email,
                    currentPassword: state.currentPassword,
                    newPassword: state.newPassword
                })
            }).then(res => res.json()).then(data => {
                console.log(data)
                dispatch(addUser(data))
                alert("ACCOUNT UPDATED")
            }).catch(err => console.log(err))

        }

        else{
            alert("The New Passwords Must Match")
        }
    }

    const deleteAccount = () => {

        fetch(`${process.env.REACT_APP_API}deleteAccount`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(currentUser)
        }).then(res => res.json()).then(data => {
            if (data.status === 200){
                dispatch(addUser(data.currentUser))
            }

            else{
                console.log(data.status)
            }
        })

    }

    const valueChange = (e) => {
        const name = e.target.name
        let value = e.target.value

        setState(ps => ({
            ...ps,
            [name]: value
        }))
    }


    return (
        <div>

        <form className={styles.form} onSubmit={updateAccount}>

            <input type="email" required name="email" placeholder="Email" value={state.email} onChange={valueChange} />
            <input type="password" required name="currentPassword" placeholder="Current Password" value={state.currentPassword} onChange={valueChange} />
            <input type="password" required name="newPassword" placeholder="New Password" value={state.newPassword} onChange={valueChange} />
            <input type="password" required name="confirmNewPassword" placeholder="Confirm New Password" value={state.confirmNewPassword} onChange={valueChange} />

            <em>Your Password Must:</em>
            <li><em>Contain Between 8-36 Characters</em></li>
            <li><em>Contain At Least 1 Mixed Case Letter</em></li>
            <li><em>Contain At Least 1 Number</em></li>
            <li><em>Be Different From Your Email</em></li>

            <input type="submit" value="Save" />

        </form>


        
        <div className={styles.delete}>

            <button onClick={deleteModalOpen}>DELETE ACCOUNT</button>

            <div className={styles.deleteModalOuter} style={{display: state.modalDisplay[0]}} onClick={deleteModalClose}>

            <div className={styles.deleteModalInner} >

                <p>Are You Sure You Want To Delete Your Account?</p>

                <button onClick={deleteAccount}>Yes</button>
                <button>No</button>

            </div>

            </div>
        </div>
            
        </div>
    )
}

export default Settings
