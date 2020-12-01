import React, {useState} from 'react'
import styles from "../CSScomponents/contactPage.module.scss"

function ContactPage() {

    const [state, setState] = useState(()=> ({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        messageResize: "100px",
        services: [{name: "Lorem", color: "unset"},{name: "Ipsum", color: "unset"},{name: "Dolor", color: "unset"},{name: "Other", color: "unset"}],
        selectedService: null
    }))

    const inputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let height = e.target.scrollHeight

        setState(ps => ({
            ...ps,
            [name]: value,
        }))

        console.log(e.target.scrollHeight)

    }

    const textareaChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let height = e.target.scrollHeight

        if (value.length > 300){
            return ""

        }

        else{
            setState(ps => ({
                ...ps,
                [name]: value,
                messageResize: height > 100 ? `${height}px` : "100px"
            }))
            console.log(value.length)
    
        }


    }
    
    const selectService = (e) => {
        let value = e.target.value;

        if (value === state.selectedService){
            let updatedServices = state.services.map(service => ({...service, color: "unset" }))
            setState(ps => ({
                ...ps,
                services: updatedServices,
                selectedService: null
            }))
        }

        else{
            let updatedServices = state.services.map(service => 
                service.name === value ? {...service, color: "red"} : {...service, color: "unset"})
            
            setState(ps => ({
                ...ps,
                services: updatedServices,
                selectedService: value
            }))

            console.log(value)
        }
    }


        
    const formSubmit = (e) => {
        e.preventDefault()
        fetch(`${process.env.REACT_APP_APPLICATIONAPI}contact-us`, {
            method: "POST",
            mode:"cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                phone: state.phone,
                selectedService: state.selectedService,
                message: state.message
            })
        }).then(res => {
            return res
            // setState(ps => ({
            //     ...ps,
            //     firstName: "",
            //     lastName: "",
            //     email: "",
            //     phone: "",
            //     message: "",
            //     services: [{name: "Lorem", color: "unset"},{name: "Ipsum", color: "unset"},{name: "Dolor", color: "unset"},{name: "Other", color: "unset"}],
            //     selectedService: null
            // }))
        })
    }


    return (
        <div className={styles.contactPage}>

            <form onSubmit={formSubmit}>

                    <div className={styles.mainInputs}>

                        <input type="text" name="firstName" placeholder="First Name" required onChange={inputChange} value={state.fullName} />
                        <input type="text" name="lastName" placeholder="Last Name" required onChange={inputChange} value={state.fullName} />
                        <input type="email" name="email" placeholder="Email" required onChange={inputChange}  value={state.email} />
                        <input type="tel" name="phone" placeholder="+44 079 8765 4321 (optional)" onChange={inputChange}  value={state.phone}  />
                    </div>

                    <p>Services</p>
                    <div className={styles.services}>
                        <input type="button" name="Lorem" value="Lorem" onClick={selectService} style={{color: state.services[0].color}}/>
                        <input type="button" name="Ipsum" value="Ipsum" onClick={selectService} style={{color: state.services[1].color}}/>
                        <input type="button" name="Dolar" value="Dolor" onClick={selectService} style={{color: state.services[2].color}}/>
                        <input type="button" name="Other" value="Other" onClick={selectService} style={{color: state.services[3].color}}/>
                    </div>

                    <textarea className={styles.message} name="message" onChange={textareaChange} value={state.message} style={{height: state.messageResize}} />
                        <p>{state.message.length}/300</p>


                    <input type="submit" value="Send Message"/>

                    

            </form>
            
        </div>
    )
}

export default ContactPage
