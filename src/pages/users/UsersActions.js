import { actionTypes } from "../../constants/ActionTypes";

export const updateUserSignin = (status) => ({
    type: actionTypes.UPDATE_SIGNIN_STATUS,
    payload: status
})

export const updateAuthToken = (token) => ({
    type: actionTypes.UPDATE_AUTH_TOKEN,
    payoad: {
        token: token
    }
})