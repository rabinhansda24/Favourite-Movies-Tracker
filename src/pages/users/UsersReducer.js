import { cloneDeep } from "lodash";
import { actionTypes } from "../../constants/ActionTypes";

const initialState = {
    users: {}
}

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_USER:
            let users = cloneDeep(state.users)
            let user = action.payload.user
            users[user.id] = user
            return {
                ...state,
                users: users
            }
        default:
            return state
            
    }
}

export default usersReducer
