import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {addToCartAction, reducingFromCartAction} from "../ReduxComponents/cartReducer"
import styles from "../CSScomponents/cartItemDiv.module.scss"

function CartItemDiv(props) {

    const dispatch = useDispatch()
    const addQuantity = () => {    
        dispatch(addToCartAction({...props}))
        console.log(JSON.parse(localStorage.getItem("cartItems"))[0])
    }

    const color = props.color

    const reduceQuantity = () => {
        dispatch(reducingFromCartAction({...props}))
        console.log("CLICK REDUCE",  props)
    }
    
    return (
         <div className={styles.cartItem}>
            <img className={styles.cartItemImg} src={`${props.frontImg}`} alt={props.title} />
            <div className={styles.itemDetails}>
                <h5>{props.title}</h5>
                <p>Size:{props.size}</p>
                <p>{props.quantity} X £{props.price}</p>

                <button onClick={addQuantity}>+</button>
                <button onClick={reduceQuantity}>-</button>
            </div>

            
        </div>
    )
}

export default CartItemDiv
