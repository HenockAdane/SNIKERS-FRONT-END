import React, { useEffect } from 'react'
import styles from "../CSScomponents/ordersPage.module.scss"
import { Link } from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import {addToCartAction} from "../ReduxComponents/cartReducer"

function OrdersPage() {

    const dispatch = useDispatch()

    const currentUser = useSelector(state => state.userReducer.currentUser)
    
    useEffect(()=>{
        if(currentUser){console.log(currentUser)} 
        console.log(currentUser.orders[currentUser.orders.length - 1].products)
    }, [currentUser])
    
    

    return (
        <div className={styles.OrdersPage}>

            {currentUser && currentUser.orders ? currentUser.orders.map(order => (
                <div className={styles.order}>
                <div className={styles.orderHeader}>

                    <div>
                        <p>ORDER PLACED</p>
                        <p>{order.orderDate}</p>
                    </div>

                    <div>
                        <p>TOTAL</p>
                        <p>£{order.totalPrice}</p>
                    </div>

                    <div>
                        <p>DISPATCH TO</p>
                        <p>{order.dispatchTo}</p>
                    </div>

                </div>

                {order.products.map(product => (

                    <div className={styles.product}>
                    <img className={styles.img} src={product.images[0]} alt="product" />

                    <div className={styles.productDetails}>
                        <p>Title: {product.title}</p>
                        <p>Color: {product.color[0]}</p>
                        <p>Price: £{product.price}</p>
                        <p>Size: {product.size}</p>
                        <p>Quantity: {product.quantity}</p>
                    
                        <div className={styles.btnContainer}>
                        <button className={styles.addToCartBtn} onClick={() => dispatch(addToCartAction(product))}>ADD TO CART</button>
                        <Link className={styles.linkBtn} to={`/products/${product._id}`}>VIEW ITEM</Link>
                        </div>
                    </div>
                </div>
                ))}

                


                
            </div>)) : <h1 style={{textAlign: "center"}}>No Orders Yet</h1>}


            
            
        </div>
    )
}

export default OrdersPage


