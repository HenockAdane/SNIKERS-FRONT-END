import React, {useState, useEffect} from "react"
import { useSelector, useDispatch } from 'react-redux'
import logo from './logo.svg';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import TaskContainer from "./taskContainer";
import SignUp from "./JScomponents/signUp";
import SignIn from "./JScomponents/signIn";
import SignInOrUp from "./JScomponents/signInOrUp";
import {addUser, removeUser} from "./ReduxComponents/userReducer"
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
import Profile from "./JScomponents/profile";

function App() {


  const [state, setState] = useState(()=> ({
    currentUser: null,
    products: [],
    cartDisplay: "none"
  }))

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

  // https://thawing-beyond-85989.herokuapp.com/
  useEffect(() => {
    fetch("http://localhost:3001/products").then(res => res.json()).then(data => {
      setState(ps => ({
        ...ps,
        products: data
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


  console.log(currentUser + "CURRENTTTTTTTTTTTTTTuserrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")

  },[currentUser])
  

  const logOut = () => {

    return dispatch(addUser(null))
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
     
  return (
    <div className="App">

    <header className="AppHeader">

      <Link to="/" className="logoLink">
      <img className="logo" src="/images/mainLogo.svg" />
      </Link>


      <ul className="AppUl">

        <Link className="nav-links" to="/confirmation">confirmation</Link>
        <Link className="nav-links" to="/">Home</Link>
        <Link className="nav-links" to="/contact-us">Contact</Link>

        {state.currentUser ? (<a href="#" className="nav-links" onClick={logOut}>SignOut</a>) : (<Link className="nav-links" to="/signInOrUp">SignIn/Up</Link>)}

        <div className="cartIconContainer" onClick={cartDisplay}>
          <img className="cartIcon" src="/images/shoppingCart/shopping-bag.svg" />
          <p className="itemCount">{cartItemsQuantity}</p>
        </div>
        
      </ul>

      <div className="cart-dropdown" style={{display: state.cartDisplay}}>
        <div className="cart-items">
        {cartItems.length ? cartItems.map(a => <CartItemDiv frontImg={a.frontImg} title={a.title} quantity={a.quantity} price={a.price} size={a.size} color={a.color} />) : <p>Your Cart Is Empty</p>}
        </div>
        <p>Total Price: £{cartItemsTotalPrice.toFixed(2)}</p>
        <Link to="/checkout">GO TO CHECKOUT</Link>
    </div>
      
    </header>

    {state.currentUser ? (<h1>{state.currentUser.username}</h1>) : (<h1>No User</h1>)}

    {/* <h1>{state.user ? "User is in" : "no user"}</h1> */}
    <h1>{`
    THINGS TO DO
    1) Make a contact form and install nodemailer,
    2) add local or session storeage`}</h1>


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

<Route exact={true} path="/profile" render={()=>(
          <Profile name="Henock" createdAt="Jun 21st 2020"/>
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
        

        />} />)}
        

<Route exact={true} path="/signInOrUp" render={()=>(
                <SignInOrUp />  )}
        />

<Route exact={true} path="/checkOut" render={()=>(
                <CheckOut />  )}
        />

    </Switch>


    





    </div>
  );
}

export default App;
