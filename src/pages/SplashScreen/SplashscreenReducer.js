import { actionTypes } from "../../constants/ActionTypes";

const initialState = {
    displaySplash: true
}

const SplashScreenReducer = (state = initialState, action) => {
    switch(action.type) {
            case actionTypes.UPDATE_SPLASH:
                console.log("Display Splash::::=> ", action.payload)
                return {
                    ...state,
                    displaySplash: action.payload.status
                }
        default:
            return state
    }
}

export default SplashScreenReducer