import React, {useState, useEffect} from 'react'
import styles from "../CSScomponents/womens.module.scss"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import ItemDiv from './itemDiv';


function WomensPage() {

    const [state, setstate] = useState(()=> ({
        products: []
    }))

    useEffect(()=> {
        fetch(`${process.env.REACT_APP_API}shop/womens`).then(res => res.json()).then(data => {
            console.log(data)
            setstate(ps => ({
                ...ps,
                products: data
            }))
            console.log(data)
        })
    }, [])

    

    return (
        <div className={styles.container}>

        

        {state.products.map(product => <ItemDiv id={product._id} frontImg={product.images[0]} title={product.title} for={product.for} type={product.type} color={product.color[1]} price={product.price} /> )}
        
            
                
        </div>
    )
}

export default WomensPage
