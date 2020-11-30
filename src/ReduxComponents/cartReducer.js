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

const addingToCartFunction = (cartItems, item) => {
    let exists = cartItems.find(a => a.title === item.title && a.color === item.color && a.size === item.size)
    

    if (exists){
        return cartItems.map(a => a === exists ? {...a, quantity: a.quantity + 1} : a)
    }

    else{
        return [...cartItems, {...item, quantity: 1}]
    }
}


const reducingFromCartFunction = (cartItems, item) => {
    let cartItem = cartItems.find(a => a.title === item.title && a.color === item.color && a.size === item.size)

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
    cartItems: [{color: "Black",
    for: "Men",
    frontImg: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/erzfadfpnzgkxt0gn2ya/air-max-plus-shoe-F5SqNr.jpg",
    price: 139.95,
    quantity: 1,
    size: "12",
    title: "Nike Air Max Plus",
    type: "Shoe"}]
}
const cartItemReducer = (state = IS, action) => {
        switch(action.type){
            case "ADDTOCART":
                return {...state, cartItems: addingToCartFunction(state.cartItems, action.item)}
            case "REDUCEFROMCART":
                return {...state, cartItems: reducingFromCartFunction(state.cartItems, action.item)}
            case "REMOVEFROMCART":
                return {...state, cartItems: removeFromCartFunction(state.cartItems, action.item)}
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
