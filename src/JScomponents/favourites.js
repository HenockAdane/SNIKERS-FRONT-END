import React from 'react'
import {useSelector} from "react-redux"
import styles from "../CSScomponents/favourites.module.scss"
import ItemDiv from './itemDiv';


function Favourites() {

    const currentUser = useSelector(state => state.userReducer.currentUser)
    console.log(currentUser.favouriteProduct)
    //make products appear

    return (
        // <div className={styles.container}>
        currentUser.favouriteProduct.length > 0 ? (<div className={styles.container}> {currentUser.favouriteProduct.map(product => <ItemDiv id={product.id} frontImg={product.images[0]} title={product.title} for={product.for} type={product.type} color={product.color[1]} price={product.price} /> )}</div>) : (<h1 style={{textAlign: "center", margin: "50px 0 0 0"}}>NO FAVOURITES</h1>)
        // </div>
    )
}

export default Favourites
