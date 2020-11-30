export const addUser = (user) => ({
    type: "addUser",
    currentUser: user
})

export const removeUser = () => ({
    type: "removeUser",
})

const IS = {
    currentUser: null
}

const userReducer = (state = IS, action) => {
    switch(action.type){
        case "addUser":
            return {...state, currentUser: action.currentUser};
        case "removeUser":
            return {...state, currentUser: null};
        default: return state
    }
}

export default userReducer