import React, {useState} from "react"
import {useDispatch} from "react-redux"
import {addUser} from "../ReduxComponents/userReducer"
import styles from "../CSScomponents/signIn.module.scss"

function SignUp() {

    const dispatch = useDispatch()

    const [state, setState] = useState(()=> ({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      }))


      const submit = (e) => {
          e.preventDefault()

        if (state.password === state.confirmPassword){
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
                alert(data.message)
    
                setState(ps => ({...ps, firstName: "", lastName:"", email:"", password: "", confirmPassword: ""}))
                console.log(state)
    
    
    
            }).catch(err => console.log(err))
        }

        else{
            alert("Passwords Must Match")
        }

      }

      const valueChange = (e) => {
          let value = e.target.value;
          let name = e.target.name;
          setState(ps => ({...ps, [name]: value }))



      }

      
    return (
        <div>

        <h1>SIGN UP</h1>

        <form className={styles.form} onSubmit={submit}>

            <input className={styles.input} type="text" name="firstName" autocomplete="on" placeholder="firstName" required value={state.firstName} onChange={valueChange} />
            <input className={styles.input} type="text" name="lastName" pautocomplete="on" laceholder="lastName" required value={state.lastName} onChange={valueChange} />
            <input className={styles.input} type="email" name="email" autocomplete="on" placeholder="email" required value={state.email} onChange={valueChange} />
            <input className={styles.input} type="password" name="password" autocomplete="off" placeholder="password" required value={state.password} onChange={valueChange} />
            <input className={styles.input} type="password" name="confirmPassword" autocomplete="off" placeholder="Confirm Password" required value={state.confirmPassword} onChange={valueChange} />

            <button type="submit">REGISTER</button>

        </form>


        {state.lastName}
        {state.password}
            
        </div>
    )
}

export default SignUp

