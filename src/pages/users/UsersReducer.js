import { cloneDeep } from "lodash";
import { actionTypes } from "../../constants/ActionTypes";

const initialState = {
    user: {},
    isUserSignedIn: false,
    authToken: ""
}

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_USER:
            let user = action.payload.user
            return {
                ...state,
                user: user
            }
        case actionTypes.UPDATE_SIGNIN_STATUS:
            return {
                ...state,
                isUserSignedIn: action.payload
            }
        case actionTypes.UPDATE_AUTH_TOKEN:
            return {
                ...state,
                authToken: action.payload.token
            }
        default:
            return state
            
    }
}

export default usersReducer
