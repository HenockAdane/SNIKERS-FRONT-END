import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "../CSScomponents/productBig.module.scss"
import {addToCartAction} from "../ReduxComponents/cartReducer"
import {addUser} from "../ReduxComponents/userReducer"
import { Link, Redirect, useParams } from 'react-router-dom'
import Loader from './loading'



function ProductBig(props) {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.userReducer.currentUser)

    const {id} = useParams()


    const [state, setState] = useState(() => ({
        sizes: [{size:2.5, className: styles.sizeBtns},{size:3, className: styles.sizeBtns},{size:3.5, className: styles.sizeBtns}, {size:4,className: styles.sizeBtns}, {size:4.5,className: styles.sizeBtns},{size:5,className: styles.sizeBtns},{size:5.5,className: styles.sizeBtns}, {size:6,className: styles.sizeBtns}, {size:6.5,className: styles.sizeBtns}, {size:7,className: styles.sizeBtns},{size:7.5,className: styles.sizeBtns},{size:8,className: styles.sizeBtns},{size:8.5,className: styles.sizeBtns},{size:9,className: styles.sizeBtns},{size:9.5,className: styles.sizeBtns},{size:10,className: styles.sizeBtns},{size:10.5,className: styles.sizeBtns},{size:11,className: styles.sizeBtns},{size:11.5,className: styles.sizeBtns},{size:12,className: styles.sizeBtns}],
        selectedSize: null,
        moreDetailsStyle: ["flex", "none"],
        product: null,
        loading: true
    }))




    useEffect(() => {

        fetch(`${process.env.REACT_APP_API}products/${id}`).then(res => {

            if (res.status === 200){
                console.log("res === 200")
                return res.json()
            }

            else{
                console.log("res !== 200")
                throw new Error(res.status)
            }
        }).then(data => {


            console.log(data,  "productBIG.........")
            console.log(data.type)

            if (data.type === "Shoe"){
                setState(ps => ({
                    ...ps,
                    product: data,
                    loading: false,
                    sizes: [{size:2.5, className: styles.sizeBtns},{size:3, className: styles.sizeBtns},{size:3.5, className: styles.sizeBtns}, {size:4,className: styles.sizeBtns}, {size:4.5,className: styles.sizeBtns},{size:5,className: styles.sizeBtns},{size:5.5,className: styles.sizeBtns}, {size:6,className: styles.sizeBtns}, {size:6.5,className: styles.sizeBtns}, {size:7,className: styles.sizeBtns},{size:7.5,className: styles.sizeBtns},{size:8,className: styles.sizeBtns},{size:8.5,className: styles.sizeBtns},{size:9,className: styles.sizeBtns},{size:9.5,className: styles.sizeBtns},{size:10,className: styles.sizeBtns},{size:10.5,className: styles.sizeBtns},{size:11,className: styles.sizeBtns},{size:11.5,className: styles.sizeBtns},{size:12,className: styles.sizeBtns}]
                }))
            }
    
            else{
                setState(ps => ({
                    ...ps,
                    product: data,
                    loading: false,
                    sizes: [{size: "XS", className: styles.sizeBtns},{size: "S", className: styles.sizeBtns},{size: "M", className: styles.sizeBtns},{size: "L", className: styles.sizeBtns},{size: "XL", className: styles.sizeBtns},{size: "2XL", className: styles.sizeBtns},]
                }))
            }



        }).catch(err => setState(ps => ({
            ...ps,
            loading: false
        })))


        
    }, [id])


    const selectSize = (e) => {
        let value = e.target.value;

        if (state.selectedSize === value){
            let newSizes = state.sizes.map(a => ({...a, className: styles.sizeBtns}))

            setState(ps => ({
                ...ps,
                sizes: newSizes,
                selectedSize: null
            }))
        }

        else{
            let newSizes = state.sizes.map(a => `${a.size}` === value ? {...a, className: styles.selectedSize} : {...a, className: styles.sizeBtns})

            setState(ps => ({
                ...ps,
                sizes: newSizes,
                selectedSize: value
            }))
        }

    }


    const displayChange = () => {
        setState(ps => ({
            ...ps,
            moreDetailsStyle: ps.moreDetailsStyle.reverse()
        }))

    
    }


    const addToCart = (e) => {
        if (state.selectedSize){

    
            console.log("clicked")
    
    
            dispatch(addToCartAction({...state.product, size: state.selectedSize}))
        }

        else{
            alert("You Need to select size first")
        }
    }

    const toggleFavourites = () => {
        if (currentUser){
            fetch(`${process.env.REACT_APP_API}toggle-favourites`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...state.product})
            }).then(res => res.json()).then(data => {
                
                dispatch(addUser(data))
                console.log(data)
    
            })
            .catch(err => console.log(err))
        }

        else{
            return (<Redirect to="/signIn" />)
        }
    }

    console.log(1000000000000000)
    return (
        <div>

            {state.product ? (<div className={styles.ProductBig}>

            <div className={styles.Container} style={{display: state.moreDetailsStyle[0]}}>

            <div className={styles.imageContainer}>

                {state.product.images.map(image => <img src={image} className={styles.imgs} alt="product" />)}

            </div>

            <div className={styles.intro}>

                <div className={styles.introHeader}>
                    <p>{state.product.for}'s {state.product.type}</p>
                    <p>£{state.product.price}</p>
                </div>

                <p className={styles.title}>{state.product.title}</p>


                <div className={styles.optionsContainer}>

                    <p>Select Size</p>

                    <div className={styles.sizeOptions}>
                    {state.sizes.map(sizeObject => <button className={sizeObject.className} onClick={selectSize} value={sizeObject.size}>{sizeObject.size}</button>)}

                    </div>

                    <button className={styles.addToCartBtn} value="Add to Bag" onClick={addToCart}>Add to Bag</button>
                    {currentUser ? (<button className={styles.favouriteBtn} value="FavouriteBtn" onClick={toggleFavourites}>Favourite 
                    </button>) : (<Link className={styles.favouriteBtnn} to="/signIn">Favourite <i className="fas fa-star"></i></Link>)}


                    <p className={styles.description}>{state.product.details.description}</p>

                    
                    <div className={styles.introList}>
                        <li>Color Shown: {state.product.color}</li>
                        <li>{state.product.style}</li>
                    </div>


                    <div className={styles.viewDetailsBtn} onClick={displayChange}>
                        <p>View Product Details</p>
                    </div>

                    

                    

                    
                    
                    
                </div>
            </div>

            
            </div>

            <div className={styles.moreDetailsContainer} style={{display: state.moreDetailsStyle[1]}}>
                <div className={styles.moreDetails}>

                        <button onClick={displayChange}>X</button>

                    <p className={styles.description}>{state.product.details.description}</p>

                    <div className={styles.benefitsList}>
                        <p>Benefits</p>
                        {state.product.details.benefits ? state.product.details.benefits.map(benefit => <li>{benefit}</li>) : false}
                    </div>


                    <div className={styles.materialsList}>
                        <p>Product Details</p>
                        {state.product.details.materials ? state.product.details.materials.map(material => <li>{material}</li>) : false}
                    </div>





                </div>
            </div>
                
        </div>): state.loading ? <Loader fullScreen={false} /> : <h1 style={{textAlign: "center"}}>ERROR 404: THIS PAGE COULD NOT BE FOUND</h1>}
        </div>
    )
}

export default ProductBig

// i have set up a register and user login using node js express with bcrypt and when i login and go to a different page, i get the warning ```a data breach on a site or app exposed your password. Chrome recommends changing your password on localhost:3001 now``` i read ```https://support.google.com/chrome/thread/23534509?hl=en``` but im the only person with access to the data