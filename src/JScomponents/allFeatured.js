import React, {useState, useEffect} from 'react'
import styles from "../CSScomponents/allFeatured.module.scss"
import ItemDiv from './itemDiv';


function AllFeatured() {

    const [state, setstate] = useState(()=> ({
        products: []
    }))

    useEffect(()=> {
        fetch("http://localhost:3001/shop/all/featured").then(res => res.json()).then(data => {
            console.log(data)
            setstate(ps => ({
                ...ps,
                products: data
            }))
        })
    }, [])

    

    return (
        <div className={styles.container}>

        

        {state.products.map(product => <ItemDiv id={product._id} frontImg={product.images[0]} title={product.title} for={product.for} type={product.type} color={product.color[1]} price={product.price} /> )}
        
            
                
        </div>
    )
}


export default AllFeatured
