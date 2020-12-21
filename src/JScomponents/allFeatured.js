import React, {useState, useEffect} from 'react'
import styles from "../CSScomponents/allFeatured.module.scss"
import ItemDiv from './itemDiv';
import Loader from './loading';



function AllFeatured() {

    const [state, setstate] = useState(()=> ({
        products: [],
        loading: true
    }))

    useEffect(()=> {

        

        fetch(`${process.env.REACT_APP_API}shop/all/featured`).then(res => res.json()).then(data => {
            console.log(data)
            setstate(ps => ({
                ...ps,
                products: data,
                loading: false
            }))
        })
    }, [])

    

    return (
        <div>
        
        {state.loading ? (<Loader fullScreen={false} />) : false}

        <div className={styles.container}>

        {state.products.map(product => <ItemDiv id={product._id} frontImg={product.images[0]} title={product.title} for={product.for} type={product.type} color={product.color[1]} price={product.price} /> )}

        </div>
        
            
                
        </div>
    )
}


export default AllFeatured
