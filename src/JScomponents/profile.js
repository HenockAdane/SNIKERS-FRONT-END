import React from 'react'
import styles from "../CSScomponents/profile.module.scss"

function Profile(props) {
    return (
        <div>

        <div className={styles.intro}>
            <div className={styles.profileImg}></div>
            
            <div className={styles.introInfo}>
                <p>{props.name}</p>
                <p>Member since: {props.createdAt}</p>
            </div>
        </div>


        <p>Member Benefits</p>
        <div className={styles.benefitsContainer}>
        
            <div className={styles.benefits}>
                <img className={styles.benefitsImg} src="/images/profile/benefits/membersOnlyProduct.jpg" alt="Woman Doing a Lunge" />
                <p>Members Only Product</p>
            </div>

            <div className={styles.benefits}>
                <img className={styles.benefitsImg} src="/images/profile/benefits/freeDelivery.jpg" alt="Collection Of Shoes" />
                <p>Free Delivery With Every Order</p>
            </div>

            <div className={styles.benefits}>
                <img className={styles.benefitsImg} src="/images/profile/benefits/exclusiveDeals.jpg" alt="Happy Birthday Box" />
                <p>Exclusive Deals</p>
            </div>

            <div className={styles.benefits}>
                <img className={styles.benefitsImg} src="/images/profile/benefits/favourites.jpg" alt="Man Signing A Shoe" />
                <p>Favourites</p>
            </div>

        </div>
            
        </div>
    )
}

export default Profile
