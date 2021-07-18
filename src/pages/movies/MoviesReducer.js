import { map } from "lodash"
import { actionTypes } from "../../constants/ActionTypes";

const initialState = {
    movies: {},
    clasifications: {},
    liked: []
}

const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_MOVIES:
            let movies = {}
            let clasifications = {}
            map(action.payload.movies, (movie, idx) => {
                movies[movie.id] = movie
                if(movie.classification in clasifications) {
                    clasifications[movie.classification].push(movie.id)
                } else {
                    clasifications[movie.classification] = [movie.id]
                }
            })
            return {
                ...state,
                movies: movies,
                clasifications: clasifications
            }
        case actionTypes.UPDATE_LIKE:
            let liked = [...state.liked]
            let idx = liked.indexOf(action.payload.id)
            if(idx > -1) {
                liked.splice(idx, 1)
            } else {
                liked.push(action.payload.id)
            }
            return {
                ...state,
                liked: liked
            }
        default:
            return state
    }
}

export default moviesReducer