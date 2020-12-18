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
                }
            })
        }).then(res => {
            if (res.status === 200){
               return res.json()
            }

            else{
                alert("There Has Been An Error With This Payment")
                throw new Error(res.status)
            }
        }).then(data => {
            console.log(data)
            alert("Payment Successful")

                dispatch(clearCartItems())
                dispatch(addUser(data.user))


            

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