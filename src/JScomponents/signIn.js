import React, {useState} from "react"
import {useDispatch } from 'react-redux'
import styles from "../CSScomponents/signIn.module.scss"
import Loader from "./loading"


import {addUser} from "../ReduxComponents/userReducer"

function SignIn() {


    const [state, setState] = useState(()=>({
        email: "xlnsqbpuqukxakrdcg@kiabws.com",
        password: "xlnsqbpuqukxakrdcg@kiabws.com",
        data: {}
    }))

    const dispatch = useDispatch()



    const valueChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;

        setState(ps => ({
            ...ps,
            [name] : value,
            loading: false
        }))

        console.log(state.email, state.password)
    }



    const formSubmit = (e) => {

        e.preventDefault()

        setState(ps => ({
            ...ps,
            loading: true
        }))


        fetch(`${process.env.REACT_APP_API}signIn`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: state.email,
                password: state.password
            })
        }).then(res => res.json()).then(data => {
            setState(ps => ({...ps, email:"", password: "", data: data, loading: false}))
            

            if (data.user){
                dispatch(addUser(data.user))
            }

            alert(data.message)


            

            console.log(data.confirmed)
            
            


        }).catch(err => console.log(err))


    }

    return (
        <div className={styles.container}>

        {state.loading ? <Loader fullScreen={true} /> : false}
        {/* {state.data && state.data.confirmed ? <Redirect to="/" />: state.date === null ? false : <Redirect to="/confirmation"/>} */}
        <h1>SIGN IN</h1>

        <form className={styles.form} onSubmit={formSubmit}>
            
            {/* <label for="email">Email</label> */}
            <input className={styles.input} type="email" name="email" placeholder="email" required value={state.email} onChange={valueChange} />
            
            {/* <label for="password">Password</label> */}
            <input className={styles.input} type="password" name="password" placeholder="password" required value={state.password} onChange={valueChange} />


            <button type="submit">LOG IN</button>


        </form>
            
        </div>
    )
}

export default SignIn
