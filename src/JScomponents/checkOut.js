import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from "../CSScomponents/checkOut.module.scss"
import {addToCartAction, reducingFromCartAction, removeFromCartAction} from "../ReduxComponents/cartReducer"
import StripeBtn from './stripeBtn'

function CheckOut() {

    const dispatch = useDispatch()

    let cartItems = useSelector(state => state.cartItemReducer.cartItems)


    let cartItemsTotalPrice = 0;
    if (cartItems.length){
      cartItems.forEach(items => {
        cartItemsTotalPrice+= items.price * items.quantity
      })

      cartItemsTotalPrice = cartItemsTotalPrice.toFixed(2)
    }
  

    return (
        <div className={styles.checkoutContainer}>
            <div className={styles.checkoutHeader}>
                <p className={styles.headerTitles}>PRODUCT</p>
                <p className={styles.headerTitles}>DESCRIPTION</p>
                <p className={styles.headerTitles}>QUANTITY</p>
                <p className={styles.headerTitles}>PRICE</p>
                <p className={`${styles.headerTitles} ${styles.small}`}>REMOVE</p>
            </div>

            {cartItems.map(item => (
                <div className={styles.checkoutItems}>
                    <img className={styles.itemTitles} src={item.frontImg} alt="Product"/>
                    <p className={styles.itemTitles}>{item.title}  
                    <br/> Size: {item.size}
                    </p>
                    <div className={styles.itemTitles && styles.quantity}>

                        <button onClick={()=>dispatch(reducingFromCartAction(item))}>-</button>

                        <p>{item.quantity}</p>

                        <button onClick={()=>dispatch(addToCartAction(item))}>+</button>

                    </div>
                    <h4 className={styles.itemTitles}>${item.price}</h4>
                    <button className={styles.delete} onClick={()=> dispatch(removeFromCartAction(item))}>X</button>
                </div>
            ))}

            <h1>TOTAL:£{cartItemsTotalPrice}</h1>
            <StripeBtn cartItemsTotalPrice={cartItemsTotalPrice} cartItems={cartItems}/>
            
            <div style={{color: "red", margin: "15px 0"}}>
                <h3>Please Use The Following Card Details</h3>
                <p>Card Number: 4242 4242 4242 4242</p>
                <p>Expiry Date: 01/30</p>
                <p>CVC: 123</p>
            </div>
            
        </div>
    )
}

export default CheckOut
