import React, {useState} from "react"
import {useDispatch} from "react-redux"
import {addUser} from "../ReduxComponents/userReducer"
import styles from "../CSScomponents/signIn.module.scss"
import Loader from "./loading"

function SignUp() {

    const dispatch = useDispatch()

    const [state, setState] = useState(()=> ({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        loading: false,
        serverMessages: {
            success: "",
            error: ""
        }
      }))


      const submit = (e) => {
          e.preventDefault()


          if (/^[a-zA-Z]+$/.test(state.firstName) && /^[a-zA-Z]+$/.test(state.lastName)){

            if(state.password.length > 7){

                if(state.password === state.confirmPassword){


                    if (state.password !== state.email){

                        setState(ps => ({
                            ...ps,
                            loading: true
                        }))

                        fetch(`${process.env.REACT_APP_API}signUp`, {
                            method: "POST",
                            mode: "cors",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                firstName: state.firstName,
                                lastName: state.lastName,
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
                                    loading: false,
                                    serverMessages: {
                                        ...ps.serverMessages,
                                        error: "There Has Been An Unexpected Error, Please Try Again"
                                    }
                                }))
                            }
                        }).then(data => {
                            console.log(data)
        
                            
                
                            if (data.user){
        
                                dispatch(addUser(data.user))
                                localStorage.setItem("snikersUser", JSON.stringify(data.user))
                                setState(ps => ({
                                    ...ps,
                                    loading: false,
                                    firstName: "", 
                                    lastName:"", 
                                    email:"", 
                                    password: "", 
                                    confirmPassword: "", 
                                }))
                            }
                            

                            else{
                                setState(ps => ({
                                    ...ps,
                                    loading: false,
                                    firstName: "", 
                                    lastName:"", 
                                    email:"", 
                                    password: "", 
                                    confirmPassword: "", 
                                    serverMessages: {
                                        ...ps.serverMessages,
                                        error: data.message
                                    }
                                }))
                            }
                
                            
                
                
                
                        }).catch(err => console.log(err))

                    }

                    else{
                        setState(ps => ({
                            ...ps,
                            serverMessages: {
                                ...ps.serverMessages,
                                error: "Your Password Must Not Be The Same As Your Email"
                            }
                        }))

                    }
                }

                else{
                    setState(ps => ({
                        ...ps,
                        serverMessages: {
                            ...ps.serverMessages,
                            error: "Your Passwords Must Match"
                        }
                    }))
                }
            }

            else{
                setState(ps => ({
                    ...ps,
                    serverMessages: {
                        ...ps.serverMessages,
                        error: "Your Password Length Must Be Longer Than 7 Characters"
                    }
                }))

            }

          }

          else{

            setState(ps => ({
                ...ps,
                serverMessages: {
                    ...ps.serverMessages,
                    error: "Your Names Must Not Contain Anything But Letters"
                }
            }))

          }

       

        

      }

      const valueChange = (e) => {
          let value = e.target.value;
          let name = e.target.name;
          setState(ps => ({...ps, [name]: value }))



      }

      
    return (
        <div className={styles.container}>

        {state.loading ? <Loader fullScreen={true} /> : false}


        <h1>SIGN UP</h1>
        <form className={styles.form} onSubmit={submit}>

            <input className={styles.input} type="text" name="firstName" placeholder="firstName" required value={state.firstName} onChange={valueChange} />                     
            <input className={styles.input} type="text" name="lastName" placeholder="lastName" required value={state.lastName} onChange={valueChange} />
            <input className={styles.input} type="email" name="email" placeholder="email" required value={state.email} onChange={valueChange} />
            <input className={styles.input} type="password" name="password" placeholder="password" required value={state.password} onChange={valueChange} />
            <input className={styles.input} type="password" name="confirmPassword" placeholder="Confirm Password" required value={state.confirmPassword} onChange={valueChange} />

            {state.serverMessages.error ? <p style={{color: "red"}}>{state.serverMessages.error}</p> : false}



            <button type="submit">SIGN UP</button>

        </form>

            
        </div>
    )
}

export default SignUp

