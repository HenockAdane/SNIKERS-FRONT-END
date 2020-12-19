import React from 'react'
import styles from "../CSScomponents/benefitsBig.module.scss"

function BenefitsBig(props) {
    return (
        <div className={styles.container}>

        <img className={styles.img} src={props.img} alt={props.alt}/>
        <div className={styles.intro}>

            <h1>{props.title}</h1>

            <p>{props.description}</p>
        </div>
            
        </div>
    )
}

export default BenefitsBig
