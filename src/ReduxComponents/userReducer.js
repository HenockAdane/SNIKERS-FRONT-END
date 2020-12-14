export const addUser = (user) => ({
    type: "addUser",
    currentUser: user
})


const IS = {
    currentUser: null
}

const userReducer = (state = IS, action) => {
    switch(action.type){
        case "addUser":
            return {...state, currentUser: action.currentUser};
        default: return state
    }
}

export default userReducer