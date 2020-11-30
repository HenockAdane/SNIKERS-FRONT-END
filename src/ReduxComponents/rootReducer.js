import {combineReducers} from "redux"
import userReducer from "./userReducer"
import cartItemReducer from "./cartReducer"

const RootReducer = combineReducers({
    userReducer,
    cartItemReducer
    
})

export default RootReducer