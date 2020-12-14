import React from 'react'
import {useSelector, useDispatch} from "react-redux"
import StripeCheckout from "react-stripe-checkout"
import {clearCartItems} from "../ReduxComponents/cartReducer"
import { addUser } from '../ReduxComponents/userReducer'

function StripeBtn(props) {

    const dispatch = useDispatch()

    const currentUser = useSelector(state => state.userReducer.currentUser)
    console.log(props.cartItemsTotalPrice)
    

    let stripePrice = Number((props.cartItemsTotalPrice * 100).toFixed(0))
    console.log(typeof stripePrice)

    const onToken = token => {
        fetch(`${process.env.REACT_APP_API}payment`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: stripePrice,
                token,
                newOrder: {
                orderDate: new Date(),
                products: props.cartItems,
                totalPrice: props.cartItemsTotalPrice,
                dispatchTo: `${currentUser.firstName} ${currentUser.lastName}`    
                }
            })
        }).then(res => res.json()).then(data => {
            alert("Payment Successful")

            dispatch(clearCartItems())
            dispatch(addUser(data.doc))

        }).catch(err => console.log("payment error:" + err))
    }
    return (
        <StripeCheckout
        image="https://svgshare.com/i/CUz.svg"
        label="PAY BY CARD"
        name="SNIKERS"
        email={currentUser ? currentUser.email : ""}
        billingAddress
        shippingAddress
        local="en"
        currency="GBP"
        panelLabel="Pay Now"
        amount= {stripePrice}
        allowRememberMe={true}
        stripeKey={process.env.REACT_APP_STRIPEKEY}
        token={onToken}

        />
    )
}

export default StripeBtn