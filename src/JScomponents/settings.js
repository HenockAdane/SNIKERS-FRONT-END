import React, { useState, useEffect } from 'react'
import styles from "../CSScomponents/settings.module.scss"
import { useSelector, useDispatch } from 'react-redux'
import { addUser } from '../ReduxComponents/userReducer'
import Loader from './loading'

function Settings() {

    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.userReducer.currentUser)

    const [state, setState] = useState(()=> ({
        email: currentUser.email,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        modalDisplay: ["none", "unset"],
        loading: false,
        rulesColor: ["black","black","black","black", "black"],
        errorMessages: ["", "", ""],
        successMessages:["","",""]
    }))

    useEffect(() => {
        
        if (state.newPassword.length > 7 && state.newPassword.length < 37){
            setState(ps => ({
                ...ps,
                rulesColor: ps.rulesColor.map((a,i)=> i === 0 ? a = "green" : a)
            }))
        }

        else{

            setState(ps => ({
                ...ps,
                rulesColor: ps.rulesColor.map((a,i)=> i === 0 ? a = "red" : a)
            }))

        }

        if (state.newPassword.length > 0 && state.newPassword === state.confirmNewPassword){
            setState(ps => ({
                ...ps,
                rulesColor: ps.rulesColor.map((a,i)=> i === 1 ? a = "green" : a)
            }))
        }


        else{

            setState(ps => ({
                ...ps,
                rulesColor: ps.rulesColor.map((a,i)=> i === 1 ? a = "red" : a)
            }))

        }

        if (/[a-z][A-Z]/.test(state.newPassword)){
            setState(ps => ({
                ...ps,
                rulesColor: ps.rulesColor.map((a,i)=> i === 2 ? a = "green" : a)
            }))
        }

        else{

            setState(ps => ({
                ...ps,
                rulesColor: ps.rulesColor.map((a,i)=> i === 2 ? a = "red" : a)
            }))

        }

        if (/[0-9]/.test(state.newPassword)){
            setState(ps => ({
                ...ps,
                rulesColor: ps.rulesColor.map((a,i)=> i === 3 ? a = "green" : a)
            }))
        }

        else{

            setState(ps => ({
                ...ps,
                rulesColor: ps.rulesColor.map((a,i)=> i === 3 ? a = "red" : a)
            }))

        }

        if (state.newPassword.length > 0 && state.newPassword !== state.email){
            setState(ps => ({
                ...ps,
                rulesColor: ps.rulesColor.map((a,i)=> i === 4 ? a = "green" : a)
            }))
        }

        else{

            setState(ps => ({
                ...ps,
                rulesColor: ps.rulesColor.map((a,i)=> i === 4 ? a = "red" : a)
            }))

        }
    }, [state.currentPassword,
    state.newPassword,
    state.confirmNewPassword,
    state.email])

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

    const updateEmail = (e) => {
        e.preventDefault()


            setState(ps => ({
                ...ps,
                loading: true
            }))

            fetch(`${process.env.REACT_APP_API}settings/change/email`, {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: state.email,
                    currentUser: currentUser
                })
            }).then(res => {

                if (res.status === 200){
                    return res.json()
                }

                else{

                    setState(ps => ({
                        ...ps,
                        errorMessages: ["There Was An Unexpected Error, Please Try Again", ps.errorMessages[1], ps.errorMessages[2]],
                        loading: false
                    }))
    
                    setTimeout(()=>{
                        setState(ps => ({
                            ...ps,
                            errorMessages: ["", ps.errorMessages[1], ps.errorMessages[2]]
                        }))
        
                    }, 5000);
                }
            }).then(data => {
                console.log(data)
                dispatch(addUser(data.user))
                localStorage.setItem("snikersUser", JSON.stringify(data.user))
                setState(ps => ({
                    ...ps,
                    loading: false,
                    successMessages: [data.message,ps.successMessages[1],ps.successMessages[2]]
                }))
                
                
                setTimeout(()=>{
                    setState(ps => ({
                        ...ps,
                        successMessages: ["", ps.successMessages[1], ps.successMessages[2]]
                    }))
    
                }, 5000);

            }).catch(err => console.log(err))

    }

    const updatePassword = (e) => {
        e.preventDefault()

        




        let everyConditionMet = state.rulesColor.every(a => a === "green")

        

        
        if (everyConditionMet){

            setState(ps => ({
                ...ps,
                loading: true
            }))

            fetch(`${process.env.REACT_APP_API}settings/change/password`, {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    currentPassword: state.currentPassword,
                    newPassword: state.newPassword,
                    currentUser:  currentUser
                })
            }).then(res => {

                if (res.status === 200){
                    return res.json()
                }

                else{
                    setState(ps => ({
                        ...ps,
                        errorMessages: [ps.errorMessages[0], "There Was An Unexpected Error, Please Try Again", ps.errorMessages[2]]
                    }))
    
                    setTimeout(()=>{
                        setState(ps => ({
                            ...ps,
                            errorMessages: [ps.errorMessages[0],"", ps.errorMessages[2]]
                        }))
        
                    }, 5000);
                }
            }).then(data => {
                console.log(data)

                if (data.user){
                    dispatch(addUser(data.user))
                    localStorage.setItem("snikersUser", JSON.stringify(data.user))
                    setState(ps => ({
                        ...ps,
                        currentPassword: "",
                        newPassword: "",
                        confirmNewPassword: "",
                        loading: false,
                        rulesColor: ["black","black","black","black","black"],
                        successMessages: [ps.successMessages[0], data.message, ps.successMessages[2]]
                    }))

                    setInterval(()=> {
                        setState(ps => ({
                            ...ps,
                            successMessages:[ps.errorMessages[0], "", ps.errorMessages[2]]
                        }))
                    }, 5000)
                }

                else{
                    setState(ps => ({
                        ...ps,
                        loading: false,
                        errorMessages: [ps.errorMessages[0], data.message, ps.errorMessages[2]]
                    }))
        
                    setInterval(()=> {
                        setState(ps => ({
                            ...ps,
                            errorMessages:[ps.errorMessages[0],"",ps.errorMessages[2]]
                        }))
                    }, 5000)
                }
                
            }).catch(err => console.log(err))

        }

    }

    const deleteAccount = () => {

        setState(ps => ({
            ...ps,
            loading: true
        }))

        fetch(`${process.env.REACT_APP_API}deleteAccount`, {
            method: "DELETE",
            mode: "cors",
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
                    errorMessages: [ps.errorMessages[0], ps.errorMessages[1], "There Was An Unexpected Error, Please Try Again"]
                }))

                setTimeout(()=>{
                    setState(ps => ({
                        ...ps,
                        errorMessages: [ps.errorMessages[0], ps.errorMessages[1], ""]
                    }))
    
                }, 5000);
            }
        }).then(data => {

            setState(ps => ({
                ...ps,
                loading: false
            }))

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
        <div className={styles.connt}>

        {state.loading ? <Loader fullScreen={true} /> : false}
        <p>{state.newPassword}</p>
        <p>{state.confirmNewPassword}</p>


        <form className={styles.form} onSubmit={updateEmail}>
            <p>Change Email</p>

            <input type="email" required name="email" placeholder="Email" value={state.email} onChange={valueChange} />
            {state.errorMessages[0] ? (<p style={{color: "red"}}><em>{state.errorMessages[0]}</em></p>) : false}
            {state.successMessages[0] ? (<p style={{color: "green"}}><em>{state.successMessages[0]}</em></p>) : false}

            <input style={{cursor: "pointer"}} className={styles.submitBtn} type="submit" value="Update Email" />


        </form>



        <form className={styles.form} onSubmit={updatePassword}>

            <p>Change Password</p>


            <input type="password" required name="currentPassword" placeholder="Current Password" value={state.currentPassword} onChange={valueChange} />
            <input type="password" required name="newPassword" placeholder="New Password" value={state.newPassword} onChange={valueChange} />
            <input type="password" required name="confirmNewPassword" placeholder="Confirm New Password" value={state.confirmNewPassword} onChange={valueChange} />

            <em>Your New Password Must:</em>
            <li style={{color: state.rulesColor[0]}}><em>Contain Between 8-36 Characters</em></li>
            <li style={{color: state.rulesColor[1]}}><em>Match Your Confirmed Password</em></li>
            <li style={{color: state.rulesColor[2]}}><em>Contain At Least 1 Mixed Case Letter</em></li>
            <li style={{color: state.rulesColor[3]}}><em>Contain At Least 1 Number</em></li>
            <li style={{color: state.rulesColor[4]}}><em>Be Different From Your Email</em></li>
            {state.errorMessages[1] ? (<p style={{color: "red"}}><em>{state.errorMessages[1]}</em></p>) : false}
            {state.successMessages[1] ? (<p style={{color: "green"}}><em>{state.successMessages[1]}</em></p>) : false}

            <input style={{cursor: "pointer"}} className={styles.submitBtn} type="submit" value="Update Password" />

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
