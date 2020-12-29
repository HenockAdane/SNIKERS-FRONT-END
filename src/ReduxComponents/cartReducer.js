export const addToCartAction = (item) => ({
    type: "ADDTOCART",
    item
})

export const reducingFromCartAction = (item) => ({
    type: "REDUCEFROMCART",
    item
})

export const removeFromCartAction = (item) => ({
    type: "REMOVEFROMCART",
    item
})

export const clearCartItems = () => ({
    type: "CLEARCARTITEMS"
})


const addingToCartFunction = (cartItems, item) => {
    let exists = cartItems.find(a => a.title === item.title && a.color[0] === item.color[0] && a.size === item.size)
    

    if (exists){
        return cartItems.map(a => a === exists ? {...a, quantity: a.quantity + 1} : a)
    }

    else{
        return [...cartItems, {...item, quantity: 1}]
    }
}


const reducingFromCartFunction = (cartItems, item) => {
    let cartItem = cartItems.find(a => a.title === item.title && a.color[0] === item.color[0] && a.size === item.size)

    if (cartItem.quantity > 1){
        return cartItems.map(a => a === cartItem ? {...a, quantity: a.quantity - 1} : a)
    }

    else{
        return cartItems.filter(a => a !== cartItem)
    }
}

export const removeFromCartFunction = (cartItems, item) => {
    // let cartItem = cartItems.find(a => a.title === item.title && a.color === item.color)

    return cartItems.filter(a => a !== item)
}


const IS = {
    cartItems: []
}
const cartItemReducer = (state = IS, action) => {
        switch(action.type){
            case "ADDTOCART":
                return {...state, cartItems: addingToCartFunction(state.cartItems, action.item)}
            case "REDUCEFROMCART":
                return {...state, cartItems: reducingFromCartFunction(state.cartItems, action.item)}
            case "REMOVEFROMCART":
                return {...state, cartItems: removeFromCartFunction(state.cartItems, action.item)}
            case "CLEARCARTITEMS":
                return {...state, cartItems: []}
            default: return state
        }
}


export default cartItemReducer


// const addingToCartFunction = (cartItems, item) => {
//     let exists = cartItems.find(a => a.title === item.title)

//     if (exists){
//         return cartItems.map(a => a === exists ? {...a, quantity: a.quantity + 1} : a)
//     }

//     else{
//         return [...cartItems, {...item, quantity: 1}]
//     }
// }


// const removingFromCartFunction = (cartItems, item) => {
//     let cartItem = cartItems.find(a => a.title === item.title)

//     if (cartItem.quantity > 1){
//         return cartItems.map(a => a === cartItem ? {...a, quantity: a.quantity - 1} : a)
//     }

//     else{
//         return cartItems.filter(a => a !== cartItem)
//     }
// }
