import React from 'react'
import styles from "../CSScomponents/home.module.scss"
import {
    Link,
  } from "react-router-dom";

function Home() {








    
    return (
        <div>

        <div className={styles.featured}>

        {/* {state.featuredItems.map(items => 
            
        )} */}

            

        </div>

        {/* <video src="/images/home/clothesVID.webm" autoplay="true" loop="true" /> */}
        {/* <img src="/images/home/allShoes.jpg" /> */}
        <div className={styles.optionsOneDiv}>

        <div className={styles.allFeatured}>
            <Link to={"/shop/all/featured"} className={styles.options} style={{backgroundImage: "url(/images/home/allFeatured.jpg)"}}>
                <p>All Featured</p>
            </Link>
        </div>

        <div className={styles.allShoes}>
            <Link to={"/shop/all/shoes"} className={styles.options} style={{backgroundImage: "url(/images/home/allShoes.jpg)"}}>
                <p>All Shoes</p>
            </Link>
        </div>

        <div className={styles.allClothing}>
            <Link to={"/shop/all/clothing"} className={styles.options} style={{backgroundImage: "url(/images/home/allClothing.jpg)"}}>
                <p>All Clothing</p>
            </Link>
        </div>


        </div>

        



        <div className={styles.optionsTwoDiv}>


            <div>
                <Link to={"/shop/mens"} className={styles.options} style={{backgroundImage: "url(/images/home/Mens.jpg)"}}>
                    <p>Men's</p>
                </Link>
            </div>

            <div>
                <Link to={"/shop/kids"} className={styles.options} style={{backgroundImage: "url(/images/home/Kids.jpg)"}}>
                    <p>Kid's</p>
                </Link>
            </div>

            <div>
                <Link to={"/shop/womens"} className={styles.options} style={{backgroundImage: "url(/images/home/Womens.jpg)"}}>
                    <p>Women's</p>
                </Link>
            </div>


        </div>
            
        </div>
    )
}

export default Home
