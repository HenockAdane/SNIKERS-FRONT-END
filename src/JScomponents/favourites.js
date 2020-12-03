import React from 'react'
import {useSelector} from "react-redux"
import styles from "../CSScomponents/favourites.module.scss"
import ItemDiv from './itemDiv';


function Favourites() {

    const currentUser = useSelector(state => state.userReducer.currentUser)

    return (
        <div className={styles.container}>
        {currentUser.favouriteProduct.length > 0 ? currentUser.favouriteProduct.map(product => <ItemDiv id={product.id} frontImg={product.images[0]} title={product.title} for={product.for} type={product.type} color={product.color[1]} price={product.price} /> ) : (<h1>NO FAVOURITES</h1>)}
        </div>
    )
}

export default Favourites
