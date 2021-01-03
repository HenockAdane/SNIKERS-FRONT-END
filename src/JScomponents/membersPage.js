import React from 'react'
import {useSelector} from "react-redux"
import styles from "../CSScomponents/member.module.scss"
import {
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Favourites from './favourites';
import OrdersPage from './ordersPage';
import Profile from './profile';
import Settings from './settings';
import BenefitsBig from "../JScomponents/benefitsBig"

function MembersPage() {

    const currentUser = useSelector(state => state.userReducer.currentUser)

    const benefits = [{
      title:"Members Only Product",
      img: "/images/profile/benefits/membersOnlyProduct.jpg",
      imgBig: "/images/profile/benefits/membersOnlyProduct-Big.jpg",
      alt: "Woman Doing a Lunge",
      description: "From first access to exclusive collaborations, Snikers members get first dibs on our hottest shoes, apparel and gear."
    },
    {
      title:"Free Delivery With Every Order",
      img: "/images/profile/benefits/freeDelivery.jpg",
      imgBig: "/images/profile/benefits/freeDelivery-Big.jpg",
      alt: "Collection Of Shoes",
      description: "When it comes to delivery, we've got you. Get free standard delivery, discounted expedited delivery and receiptless returns every time you shop."
    },
    {
      title:"Exclusive Deals",
      img: "/images/profile/benefits/exclusiveDeals.jpg",
      imgBig: "/images/profile/benefits/exclusiveDeals-Big.jpg",
      alt: "Happy Birthday Box",
      description: "Snikers deals don't happen often, but when they do, Snikers Members get more. We'll let you know about our special promos—like on your birthday and other key events throughout the year."
    }]
    return (
        currentUser ? (<div className={styles.membersPage}>
          <header className={styles.header} >
  
          <Link className={styles.headerLinks} to="/member/profile">Profile</Link>
          <Link className={styles.headerLinks} to="/member/orders">Orders</Link>
          <Link className={`${styles.headerLinks} ${styles.bigLink}`} to="/member/favourites">Favourites</Link>
          <Link className={styles.headerLinks} to="/member/settings">Settings</Link>
  
          </header>
  
  
  
          <Switch>
  
          <Route exact={true} path="/member/profile" render={()=>(
            <Profile name={`${currentUser.firstName} ${currentUser.lastName}`}/>
          )}
          />
  
          <Route exact path="/member/favourites" render={()=> (
            <Favourites />
          )}
          />
  
          <Route exact path="/member/orders" render={()=> (
           currentUser.orders.length > 0 ? (<OrdersPage />) : false
          )}
          />
  
          <Route exact path="/member/settings" render={()=> (
           <Settings />
          )}
          />
  
          {benefits.map(benefit => 
          (<Route exact path={`/member/benefits/${benefit.title}`} render={()=> (
            <BenefitsBig img={benefit.imgBig} title={benefit.title} description={benefit.description} alt={benefit.alt} />
          )} />
          )
          )}
  
  
          </Switch>
  
          <div className={styles.benefitsContainer}>
  
          {benefits.map(benefit => (<Link to={`/member/benefits/${benefit.title}`} className={styles.benefits}>
            <img className={styles.benefitsImg} src={benefit.img} alt={benefit.alt}
            />
            <p>{benefit.title}</p>
            </Link>))}
  
          </div>
              
          </div>) : (<Redirect to="/" />)
    )
}

export default MembersPage
