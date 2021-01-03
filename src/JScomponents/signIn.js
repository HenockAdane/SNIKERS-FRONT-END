import React, {useState} from "react"
import {useDispatch } from 'react-redux'
import styles from "../CSScomponents/signIn.module.scss"
import { Link } from "react-router-dom"
import Loader from "./loading"


import {addUser} from "../ReduxComponents/userReducer"

function SignIn() {


    const [state, setState] = useState(()=>({
        email: "xwzmdbqxzwtjivdxnd@mhzayt.online",
        password: "xwzmdbqxzwtjivdxnd@mhzayt.online",
        data: {},
        errorMessage: ""
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
            setState(ps => ({...ps, email:"", password: "", data: data, loading: false}))
            

            if (data.user){
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

            {state.errorMessage ? (<p style={{color: "red"}}><em>{state.errorMessage}</em></p>) : false}


            <button type="submit">SIGN IN</button>
            <Link to="/signUp">SIGN UP</Link>


        </form>

        
            
        </div>
    )
}

export default SignIn
