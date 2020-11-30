import React, {useState, useEffect} from 'react'
import styles from "../CSScomponents/home.module.scss"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";

function Home() {


    const [state, setState] = useState(() => ({
        featuredItems: []
    }))


    useEffect(() => {
        fetch("http://localhost:3001/homeFeatured").then(res => res.json()).then(data => {
            setState(ps => ({
                ...ps,
                featuredItems: data
            }))
        })
    },[])





    
    return (
        <div>

        <div className={styles.featured}>

        {/* {state.featuredItems.map(items => 
            
        )} */}

            

        </div>

        {/* <video src="/images/home/clothesVID.webm" autoplay="true" loop="true" /> */}
        {/* <img src="/images/home/allShoes.jpg" /> */}
        <div className={styles.optionsOneDiv}>

            <Link to={"/shop/all/featured"} className={`${styles.options} ${styles.allFeatured}`} style={{backgroundImage: "url(/images/home/allFeatured.jpg)"}}>
                <p>All Featured</p>
            </Link>

            <Link to={"/shop/all/shoes"} className={`${styles.options} ${styles.allShoes}`} style={{backgroundImage: "url(/images/home/allShoes.jpg)"}}>
                <p>All Shoes</p>
            </Link>

            <Link to={"/shop/all/clothing"} className={`${styles.options} ${styles.allClothing}`} style={{backgroundImage: "url(/images/home/allClothing.jpg)"}}>
                <p>All Clothing</p>
            </Link>


        </div>

        



        <div className={styles.optionsTwoDiv}>

            <Link to={"/shop/mens"} className={styles.options} style={{backgroundImage: "url(/images/home/Mens.jpg)"}}>
                <p>Men's</p>
            </Link>

            <Link to={"/shop/kids"} className={styles.options} style={{backgroundImage: "url(/images/home/Kids.jpg)"}}>
                <p>Kid's</p>
            </Link>

            <Link to={"/shop/womens"} className={styles.options} style={{backgroundImage: "url(/images/home/Womens.jpg)"}}>
                <p>Women's</p>
            </Link>


        </div>
            
        </div>
    )
}

export default Home
