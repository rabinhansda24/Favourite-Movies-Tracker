import { actionTypes } from "../../constants/ActionTypes";

export const updateUserSignin = (status) => ({
    type: actionTypes.UPDATE_SIGNIN_STATUS,
    payload: status
})

export const updateAuthToken = (token) => ({
    type: actionTypes.UPDATE_AUTH_TOKEN,
    payload: {
        token: token
    }
})

export const addUser = (user) => ({
    type: actionTypes.ADD_USER,
    payload: {
        user: user
    }
})