import React from 'react'
import {useSelector} from "react-redux"
import styles from "../CSScomponents/member.module.scss"
import {
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Favourites from './favourites';
import OrdersPage from './ordersPage';
import Profile from './profile';
import Settings from './settings';

function MembersPage() {

    const currentUser = useSelector(state => state.userReducer.currentUser)
    return (
        <div className={styles.membersPage}>
        <h1>MembersPage</h1>
        <header className={styles.header} >

        <Link className={styles.headerLinks} to="/member/profile">Profile</Link>
        <Link className={styles.headerLinks} to="/member/orders">Orders</Link>
        <Link className={styles.headerLinks} to="/member/favourites">Favourites</Link>
        <Link className={styles.headerLinks} to="/member/settings">Settings</Link>

        </header>



        <Switch>

        <Route exact={true} path="/member/profile" render={()=>(
          <Profile name={`${currentUser.firstName} ${currentUser.lastName}`} createdAt="Jun 21st 2020"/>
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

        </Switch>
            
        </div>
    )
}

export default MembersPage
