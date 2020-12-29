import React from 'react'
import styles from "../CSScomponents/itemDiv.module.scss"
import {
    Link,
  } from "react-router-dom";

function ItemDiv(props) {




    return (
        <Link to={`/products/${props.id}`} className={styles.product}>
                <div className={styles.imgContainer}>
                    <img src={props.frontImg} alt="product"/>
                </div>
                <p>{props.title}</p>
                <p className={styles.grey}>{props.for}'s {props.type}</p>
                <p  className={styles.grey}>{props.color} </p>
                <p>£{props.price}</p>
                {/* <button className={styles.addToCartBtn} onClick={addToCart}>Add To Cart</button> */}
                </Link>
    )
}

export default ItemDiv
