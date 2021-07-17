import { actionTypes } from "../../constants/ActionTypes";

const initialState = {
    movies: []
}

const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_MOVIES:
            return {
                ...state,
                movies: action.payload.movies
            }
        default:
            return state
    }
}

export default moviesReducer