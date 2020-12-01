import React, {useState, useEffect} from 'react'
import styles from "../CSScomponents/kids.module.scss"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import ItemDiv from './itemDiv';


function KidsPage() {

    const [state, setstate] = useState(()=> ({
        products: []
    }))

    useEffect(()=> {
        fetch(`${process.env.REACT_APP_API}shop/kids`).then(res => res.json()).then(data => {
            console.log(data)
            let kids = data.filter(item => item.for.toLowerCase().includes("kid"))
            setstate(ps => ({
                ...ps,
                products: kids
            }))
        })
    }, [])

    

    return (
        <div className={styles.container}>

        
        {state.products.map(product => <ItemDiv id={product._id} frontImg={product.images[0]} title={product.title} for={product.for} type={product.type} color={product.color[1]} price={product.price} /> )}
        
            
                
        </div>
    )
}

export default KidsPage
