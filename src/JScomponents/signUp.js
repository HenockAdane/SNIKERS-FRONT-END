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
        rulesColor: ["black","black","black","black","black"]
      }))


      const submit = (e) => {
          e.preventDefault()

        if (/[^a-zA-Z]+/.test(state.firstName) || /[^a-zA-Z]+/.test(state.lastName)){

            alert("The First Name Or Last Name Input Should Not Contain Anything But Letters")

        }

        else{


            if (state.password === state.confirmPassword){

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
                }).then(res => res.json()).then(data => {
                    console.log(data)

                    
        
                    if (data.user){

                        dispatch(addUser(data.user))
                        
                    }
        
                    setState(ps => ({...ps, firstName: "", lastName:"", email:"", password: "", confirmPassword: "", loading: false}))
                    console.log(state)
        
        
        
                }).catch(err => console.log(err))
            }

            else{
                alert("Passwords Must Match")
            }
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

            <li style={{color: state.rulesColor[0]}}><em>Your First And Last Name Must Not Contain Non Letter Characters</em></li>

            <em>Your Password Must:</em>
            <li style={{color: state.rulesColor[0]}}><em>Contain Between 8-36 Characters</em></li>
            <li style={{color: state.rulesColor[1]}}><em>Match Eachother</em></li>
            <li style={{color: state.rulesColor[2]}}><em>Contain At Least 1 Mixed Case Letter</em></li>
            <li style={{color: state.rulesColor[3]}}><em>Contain At Least 1 Number</em></li>
            <li style={{color: state.rulesColor[4]}}><em>Be Different From Your Email</em></li>


            <button type="submit">SIGN UP</button>

        </form>

            
        </div>
    )
}

export default SignUp

