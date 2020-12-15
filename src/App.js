import React, {useState, useEffect} from "react"
import { useSelector, useDispatch } from 'react-redux'
import './App.scss';
import {
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import SignInOrUp from "./JScomponents/signInOrUp";
import {addUser} from "./ReduxComponents/userReducer"
import Home from "./JScomponents/home";
import MensPage from "./JScomponents/mensPage";
import ProductBig from "./JScomponents/productBig";
import CartItemDiv from "./JScomponents/cartItemDiv";
import CheckOut from "./JScomponents/checkOut";
import WomensPage from "./JScomponents/womensPage";
import KidsPage from "./JScomponents/kidsPage";
import ContactPage from "./JScomponents/contactPage";
import ConfirmationPage from "./JScomponents/confirmationPage";
import AllShoes from "./JScomponents/allShoes";
import AllClothing from "./JScomponents/allClothing";
import AllFeatured from "./JScomponents/allFeatured";
import MembersPage from "./JScomponents/membersPage";

function App() {


  const [state, setState] = useState(()=> ({
    currentUser: null,
    products: [],
    cartDisplay: "none",
    menuStyle: "menu",
    ulStyle: ""

  }))

  console.log(REACT_APP_API)

  const dispatch = useDispatch()
  let currentUser = useSelector(state => state.userReducer.currentUser)
  let cartItems = useSelector(state => state.cartItemReducer.cartItems)
  let cartItemsQuantity = 0;
  let cartItemsTotalPrice = 0;
  if (cartItems.length){
    cartItems.forEach(items => {
      cartItemsQuantity+= items.quantity
      cartItemsTotalPrice+= items.price * items.quantity
    })
  }
  console.log(cartItems)
  // cartItems.forEach(items => cartItemsQuantity+= items.quantity)

  useEffect(() => {

    window.addEventListener("resize", (e)=>{
      if (window.innerWidth > 768){
        setState(ps => ({
          ...ps,
          ulStyle: "flex"
        }))
      }

      else{
        setState(ps=> ({
          ...ps,
          ulStyle: "none"
        }))
      }
    })

    fetch(`${process.env.REACT_APP_API}products`).then(res => res.json()).then(data => {
      setState(ps => ({
        ...ps,
        products: data,
      }))
      // console.log(data[data.length - 1]._id)
      console.log(84.95 * 3)
    })
  }, [])


  useEffect(()=> {

  setState(ps => ({
    ...ps,
    currentUser: currentUser
  }))


  console.log(currentUser)

  },[currentUser])
  

  const logOut = () => {

    fetch(`${process.env.REACT_APP_API}signOut`, {
      method: "PUT",
      mode: "cors",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({})
    }).then(res => res.json()).then(data => {
      console.log(data)
      dispatch(addUser(data.user))
    }).catch(err => console.log(`ERROR FOR SIGNOUT API: ${err}`))

  }

  const cartDisplay = () => {
    if (state.cartDisplay === "flex"){
      setState(ps => ({
        ...ps,
        cartDisplay: "none"
      }))
    }

    else{
      setState(ps => ({
        ...ps,
        cartDisplay: "flex"
      }))
    }
  }

  const toggleMenu = (e) => {
    console.log(e.target)

    if (state.menuStyle === "menu"){
      setState(ps => ({
        ...ps,
        menuStyle: "menu open",
        ulStyle: "flex"
      }))
    }
    else{
      setState(ps => ({
        ...ps,
        menuStyle: "menu",
        ulStyle: "none"
      }))
    }}
     
  return (
    <div className="App">

    <header className="AppHeader">

    <div className="anotherMenu">
      <Link to="/" className="logoLink">
      <img className="logo" src="/favicon.svg" alt="main logo" />
      </Link>

      <div className="subContainer">
        <Link className="cartIconContainer" to="/checkout">
            <img className="cartIcon" src="/images/shoppingCart/shopping-bag.svg" alt="cartIcon"/>
            <p className="itemCount">{cartItemsQuantity}</p>
        </Link>

        <div className={state.menuStyle} onClick={toggleMenu}>
              <div className="burger"></div>
        </div>
      </div>
    </div>


      <ul className="AppUl" style={{display: state.ulStyle}}> 

        <Link className="nav-links" to="/">Home</Link>
        <Link className="nav-links" to="/contact-us">Contact</Link>
        <Link className="nav-links" to="/member">Account</Link>

        {state.currentUser ? (<Link to="/signInOrUp" className="nav-links" onClick={logOut}>SignOut</Link>) : (<Link className="nav-links" to="/signInOrUp">SignIn/Up</Link>)}

        <div className="cartIconContainer" onClick={cartDisplay}>
          <img className="cartIcon" src="/images/shoppingCart/shopping-bag.svg" alt="cartIcon"/>
          <p className="itemCount">{cartItemsQuantity}</p>
        </div>
        
      </ul>

      <div className="cart-dropdown" style={{display: state.cartDisplay}}>
        <div className="cart-items">
        {cartItems.length ? cartItems.map(a => <CartItemDiv id={a._id} frontImg={a.frontImg} title={a.title} quantity={a.quantity} price={a.price} size={a.size} color={a.color} />) : <p>Your Cart Is Empty</p>}
        </div>
        <p>Total Price: £{cartItemsTotalPrice.toFixed(2)}</p>
        <Link to="/checkout">GO TO CHECKOUT</Link>
    </div>
      
    </header>

    {state.currentUser ? (<h1>{state.currentUser.username}</h1>) : (<h1>No User</h1>)}

    {/* <h1>{state.user ? "User is in" : "no user"}</h1> */}
    <h1>{`
    THINGS TO DO
    1) Account Settings API route`}</h1>


    <Switch>
        {/* <Route exact={true} path="/" render={()=>(
                <TaskContainer/>  )}
        /> */}

        <Route exact={true} path="/" render={()=>(
                <Home/>  )}
        />

<Route exact={true} path="/shop/all/featured" render={()=>(
                <AllFeatured /> )}
        />

<Route exact={true} path="/shop/all/shoes" render={()=>(
                <AllShoes /> )}
        />

<Route exact={true} path="/shop/all/clothing" render={()=>(
                <AllClothing /> )}
        />

<Route exact={true} path="/shop/mens" render={()=>(
                <MensPage/>  )}
        />

<Route exact={true} path="/shop/womens" render={()=>(
                <WomensPage />  )}
        />

        <Route exact={true} path="/shop/kids" render={()=>(
          <KidsPage /> 
        )}
        />

<Route exact={true} path="/contact-us" render={()=>(
          <ContactPage /> 
        )}
        />


        

        <Route exact path="/confirmation" render={()=>(
          state.currentUser && state.currentUser.confirmed ? (<Redirect to="/" />) : !state.currentUser ? (<Redirect to="/" />) : (<ConfirmationPage />)
        )}
        />

        



        {/* {state.products.map(product => {
          (<Route exact={true} path={product._id} render={() => (<ProductBig img={product.images[0]}/>))

        })} */}

        {state.products.map(product => <Route exact={true} path={`/${product._id}`} render={() => <ProductBig 
        images={product.images}
        for={product.for}
        type={product.type}
        price={product.price}
        title={product.title}
        description={product.details.description}
        moreDetailsTitle={product.details.title}
        moreDetailsMaterials={product.details.materials}
        moreDetailsBenefits={product.details.benefits}
        color={product.color[0]}
        style={product.details.materials[product.details.materials.length -1]}
        origins={product.details.origins}
        id={product._id}
        

        />} />)}
        

<Route exact={true} path="/signInOrUp" render={()=> 
state.currentUser && state.currentUser.confirmed ? (<Redirect to="/member/settings" />) : state.currentUser ? (<Redirect to="/confirmation" />) : (<SignInOrUp />)}
        />

<Route exact={true} path="/checkOut" render={()=>(
                <CheckOut />  )}
        />

<Route exact={false} path="/member" render={()=>(
                state.currentUser && state.currentUser.confirmed ? (<MembersPage />) : state.currentUser ? (<Redirect to="/confirmation" />) : (<Redirect to="/signInOrUp" />) )}
        />

    </Switch>


    <footer>

      <div className="sectionOneContainer">

        <div>
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/signInOrUp">BECOME A MEMBER</Link></li>
          <li><Link to="/contact-us">CONTACT US</Link></li>
        </div>

        <div>
          <li><Link to="/">LOREM</Link></li>
          <li><Link to="/">IPSUM</Link></li>
          <li><Link to="/">DOLOR</Link></li>
        </div>

        <div>
          <li><Link to="/">LOREM</Link></li>
          <li><Link to="/">IPSUM</Link></li>
          <li><Link to="/">DOLOR</Link></li>
        </div>
      </div>

      <div className="socialMedia">
          <button><img src="/images/social-Icon/instagram.svg" alt="instagram icon" /></button>

          <button><img src="/images/social-Icon/youtube.svg" alt="youtube icon" /></button>

          <button><img src="/images/social-Icon/twitter.svg" alt="twitter icon" /></button>

          <button><img src="/images/social-Icon/youtube.svg" alt="youtube icon" /></button>

          
      </div>

    </footer>


    





    </div>
  );
}

export default App;
