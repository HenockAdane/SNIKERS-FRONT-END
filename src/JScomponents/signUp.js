import React, {useState} from "react"
import styles from "../CSScomponents/signOut.module.css"

function SignUp() {

    const [state, setState] = useState(()=> ({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }))


      const submit = (e) => {
          e.preventDefault()

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


            console.log("SIGNED UP")

            setState(ps => ({...ps, firstName: "", lastName:"", email:"", password: ""}))



        }).catch(err => console.log(err))

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

            <input className={styles.input} type="text" name="firstName" placeholder="firstName" required value={state.name} onChange={valueChange} />
            <input className={styles.input} type="text" name="lastName" placeholder="lastName" required value={state.name} onChange={valueChange} />
            <input className={styles.input} type="email" name="email" placeholder="email" required value={state.email} onChange={valueChange} />
            <input className={styles.input} type="password" name="password" placeholder="password" required value={state.password} onChange={valueChange} />

            <input type="submit" value="Register"></input>

        </form>


        {state.lastName}
        {state.password}
            
        </div>
    )
}

export default SignUp

