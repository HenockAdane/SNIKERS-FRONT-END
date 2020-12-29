import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from "../CSScomponents/checkOut.module.scss"
import {addToCartAction, reducingFromCartAction} from "../ReduxComponents/cartReducer"
import StripeBtn from './stripeBtn'

function CheckOut() {

    const dispatch = useDispatch()

    let cartItems = useSelector(state => state.cartItemReducer.cartItems)
    
    


    let cartItemsTotalPrice = 0;
    if (cartItems.length){
      cartItems.forEach(items => {
        cartItemsTotalPrice+= items.price * items.quantity
      })

      console.log(cartItems[0])
      

      cartItemsTotalPrice = cartItemsTotalPrice.toFixed(2)
    }
  

    return (
        <div className={styles.checkoutContainer} style={cartItems.length > 0 ? {minHeight: "90vh"} : {minHeight: "65vh", justifyContent: "space-evenly"}}>
        {cartItems.length > 0 ? false : <p>Your Cart Is Empty</p>}
           

            

            {cartItems.map(product => (
                <div className={styles.product}>
                    <img className={styles.img} src={product.images[0]} alt="Product" />

                    <div className={styles.productDetails}>

                        <p>Title: {product.title}</p>
                        <p>Color: {product.color[0]}</p>
                        <p>For: {product.for}</p>
                        <p>Size: {product.size}</p>
                        <div className={styles.btnContainer}>
                            <button onClick={() => dispatch(addToCartAction(product))}>+</button>
                            <p>Quantity: {product.quantity}</p>
                            <button onClick={() => dispatch(reducingFromCartAction(product))}>-</button> 
                        </div>
                        <p>Price: £{product.price}</p>


                    </div>

                </div>
            ))}

            <p>TOTAL:£{cartItemsTotalPrice}</p>
            <StripeBtn cartItemsTotalPrice={cartItemsTotalPrice} cartItems={cartItems}/>
            
            <div style={{color: "red", margin: "15px 0"}}>
                <p>Please Use The Following Card Details</p>
                <p>Card Number: 4242 4242 4242 4242</p>
                <p>Expiry Date: 01/30</p>
                <p>CVC: 123</p>
            </div>
            
        </div>
    )
}

export default CheckOut
