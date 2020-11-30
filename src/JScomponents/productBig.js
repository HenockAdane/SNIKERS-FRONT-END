import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from "../CSScomponents/productBig.module.scss"
import { faHeart } from "@fortawesome/fontawesome-free"
import {addToCartAction, reducingFromCartAction} from "../ReduxComponents/cartReducer"


function ProductBig(props) {

    const dispatch = useDispatch();


    const [state, setState] = useState(() => ({
        sizes: [{size:2.5, className: styles.sizeBtns},{size:3, className: styles.sizeBtns},{size:3.5, className: styles.sizeBtns}, {size:4,className: styles.sizeBtns}, {size:4.5,className: styles.sizeBtns},{size:5,className: styles.sizeBtns},{size:5.5,className: styles.sizeBtns}, {size:6,className: styles.sizeBtns}, {size:6.5,className: styles.sizeBtns}, {size:7,className: styles.sizeBtns},{size:7.5,className: styles.sizeBtns},{size:8,className: styles.sizeBtns},{size:8.5,className: styles.sizeBtns},{size:9,className: styles.sizeBtns},{size:9.5,className: styles.sizeBtns},{size:10,className: styles.sizeBtns},{size:10.5,className: styles.sizeBtns},{size:11,className: styles.sizeBtns},{size:11.5,className: styles.sizeBtns},{size:12,className: styles.sizeBtns}],
        selectedSize: null,
        moreDetailsStyle: ["flex", "none"]
    }))


    useEffect(() => {
        if (props.type === "Shoe"){
            setState(ps => ({
                ...ps,
                sizes: [{size:2.5, className: styles.sizeBtns},{size:3, className: styles.sizeBtns},{size:3.5, className: styles.sizeBtns}, {size:4,className: styles.sizeBtns}, {size:4.5,className: styles.sizeBtns},{size:5,className: styles.sizeBtns},{size:5.5,className: styles.sizeBtns}, {size:6,className: styles.sizeBtns}, {size:6.5,className: styles.sizeBtns}, {size:7,className: styles.sizeBtns},{size:7.5,className: styles.sizeBtns},{size:8,className: styles.sizeBtns},{size:8.5,className: styles.sizeBtns},{size:9,className: styles.sizeBtns},{size:9.5,className: styles.sizeBtns},{size:10,className: styles.sizeBtns},{size:10.5,className: styles.sizeBtns},{size:11,className: styles.sizeBtns},{size:11.5,className: styles.sizeBtns},{size:12,className: styles.sizeBtns}]
            }))
        }

        else{
            setState(ps => ({
                ...ps,
                sizes: [{size: "XS", className: styles.sizeBtns},{size: "S", className: styles.sizeBtns},{size: "M", className: styles.sizeBtns},{size: "L", className: styles.sizeBtns},{size: "XL", className: styles.sizeBtns},{size: "2XL", className: styles.sizeBtns},]
            }))
        }
    }, [])


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
            let newSizes = state.sizes.map(a => a.size == value ? {...a, className: styles.selectedSize} : {...a, className: styles.sizeBtns})

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
            const item = {
                title: props.title,
                frontImg: props.images[0],
                color: props.color,
                for: props.for,
                type: props.type,
                size: state.selectedSize,
                price: props.price
            }
    
            console.log("clicked")
    
    
            dispatch(addToCartAction(item))
        }

        else{
            console.log("Need to select size first")
        }
    }

    console.log(1000000000000000)
    return (
        <div className={styles.ProductBig}>
            <div className={styles.Container} style={{display: state.moreDetailsStyle[0]}}>

            <div className={styles.imageContainer}>

                {props.images.map(image => <img src={image} className={styles.imgs}/>)}

            </div>

            <div className={styles.intro}>

                <div className={styles.introHeader}>
                    <p>{props.for}'s {props.type}</p>
                    <p>£{props.price}</p>
                </div>

                <p className={styles.title}>{props.title}</p>


                <div className={styles.optionsContainer}>

                    <p>Select Size</p>

                    <div className={styles.sizeOptions}>
                    {state.sizes.map(sizeObject => <button className={sizeObject.className} onClick={selectSize} value={sizeObject.size}>{sizeObject.size}</button>)}

                    </div>

                    <button className={styles.addToCartBtn} value="Add to Bag" onClick={addToCart}>Add to Bag</button>
                    <button className={styles.favouriteBtn} value="FavouriteBtn">Favourite
                    {faHeart}
                    </button>


                    <p className={styles.description}>{props.description}</p>

                    
                    <div className={styles.introList}>
                        <li>Color Shown: {props.color}</li>
                        <li>{props.style}</li>
                    </div>


                    <div className={styles.viewDetailsBtn} onClick={displayChange}>
                        <p>View Product Details</p>
                    </div>

                    

                    

                    
                    
                    
                </div>
            </div>

            
            </div>

            <div className={styles.moreDetailsContainer} style={{display: state.moreDetailsStyle[1]}}>
                <div className={styles.moreDetails}>

                    <div className={styles.moreDetailsHeader}>
                        <p>{props.moreDetailsTitle}</p>
                        <button onClick={displayChange}>EXIT</button>
                    </div>

                    <p className={styles.description}>{props.description}</p>

                    <div className={styles.benefitsList}>
                        <p>Benefits</p>
                        {props.moreDetailsBenefits ? props.moreDetailsBenefits.map(benefit => <li>{benefit}</li>) : false}
                    </div>


                    <div className={styles.materialsList}>
                        <p>Product Details</p>
                        {props.moreDetailsMaterials ? props.moreDetailsMaterials.map(material => <li>{material}</li>) : false}
                    </div>





                </div>
            </div>
                
        </div>
    )
}

export default ProductBig

// i have set up a register and user login using node js express with bcrypt and when i login and go to a different page, i get the warning ```a data breach on a site or app exposed your password. Chrome recommends changing your password on localhost:3001 now``` i read ```https://support.google.com/chrome/thread/23534509?hl=en``` but im the only person with access to the data