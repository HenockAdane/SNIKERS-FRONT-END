import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import styles from "../CSScomponents/contactPage.module.scss"
import Loader from './loading';

function ContactPage() {

    let currentUser = useSelector(state => state.userReducer.currentUser)

    const [state, setState] = useState(()=> ({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        messageResize: "100px",
        services: [{name: "Lorem", color: "unset", backGround: "white"},{name: "Ipsum", color: "unset", backGround: "white"},{name: "Dolor", color: "unset", backGround: "white"},{name: "Other", color: "unset", backGround: "white"}],
        selectedService: null,
        loading: false,
        serverMessages: {
            success: "",
            error: ""
        }
    }))

    useEffect(()=>{
        if (currentUser){
            setState(ps => ({
                ...ps,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                email: currentUser.email
            }))
        }
    },[currentUser])

    const inputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

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
            let updatedServices = state.services.map(service => ({...service, color: "unset", backGround: "white" }))
            setState(ps => ({
                ...ps,
                services: updatedServices,
                selectedService: null
            }))
        }

        else{
            let updatedServices = state.services.map(service => 
                service.name === value ? {...service, color: "white", backGround: "black" } : {...service, color: "unset", backGround: "white"})
            
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

        setState(ps => ({
            ...ps, 
            loading: true
        }))
        fetch(`${process.env.REACT_APP_API}contact-us`, {
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

                setTimeout(()=>{
                    setState(ps => ({
                        ...ps,
                        serverMessages: {
                            ...ps.serverMessages,
                            error: ""
                        }
                    }))
    
                }, 5000);

            }
            
        }).then(data => {
            setState(ps => ({
                ...ps,
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                message: "",
                services: [{name: "Lorem", color: "unset", backGround: "white"},{name: "Ipsum", color: "unset", backGround: "white"},{name: "Dolor", color: "unset", backGround: "white"},{name: "Other", color: "unset", backGround: "white"}],
                selectedService: null,
                loading: false,
                serverMessages: {
                    ...ps.serverMessages,
                    success: data.message
                }
            }))

            setTimeout(()=>{
                setState(ps => ({
                    ...ps,
                    serverMessages: {
                        ...ps.serverMessages,
                        success: ""
                    }
                }))

            }, 5000);
        })
    }


    return (
        <div className={styles.contactPage}>

        {state.loading ? <Loader fullScreen={true} /> : false}

            <form onSubmit={formSubmit}>

                    <div className={styles.mainInputs}>

                        <input type="text" name="firstName" placeholder="First Name" required onChange={inputChange} value={state.firstName} />
                        <input type="text" name="lastName" placeholder="Last Name" required onChange={inputChange} value={state.lastName} />
                        <input type="email" name="email" placeholder="Email" required onChange={inputChange}  value={state.email} />
                        <input type="tel" name="phone" placeholder="+44 079 8765 4321 (optional)" onChange={inputChange}  value={state.phone} pattern="[0-9]" />
                    </div>

                    <p>Services</p>
                    <div className={styles.services}>
                        <input type="button" name="Lorem" value="Lorem" onClick={selectService} style={{color: state.services[0].color, backgroundColor: state.services[0].backGround}}/>
                        <input type="button" name="Ipsum" value="Ipsum" onClick={selectService} style={{color: state.services[1].color, backgroundColor: state.services[1].backGround}}/>
                        <input type="button" name="Dolar" value="Dolor" onClick={selectService} style={{color: state.services[2].color, backgroundColor: state.services[2].backGround}}/>
                        <input type="button" name="Other" value="Other" onClick={selectService} style={{color: state.services[3].color, backgroundColor: state.services[3].backGround}}/>
                    </div>

                    <textarea className={styles.message} name="message" placeholder="Please Detail More Your Reason For Contacting Us" onChange={textareaChange} value={state.message} style={{height: state.messageResize}} />
                        <p>{state.message.length}/300</p>

                        {state.serverMessages.success ? <p style={{color: "green"}}>{state.serverMessages.success}</p> : false}
                        {state.serverMessages.error ? <p style={{color: "red"}}>{state.serverMessages.error}</p> : false}


                    <button type="submit" >SEND MESSAGE</button>

                    

            </form>
            
        </div>
    )
}

export default ContactPage
