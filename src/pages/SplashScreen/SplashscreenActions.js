import { actionTypes } from "../../constants/ActionTypes";


export const updateSplash = (status) => ({
    type: actionTypes.UPDATE_SPLASH,
    payload: {
        status: status
    }
})