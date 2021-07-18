import { actionTypes } from "../../constants/ActionTypes";

export const setMovies = (movies) => ({
    type: actionTypes.SET_MOVIES,
    payload: {
        movies: movies
    }
})

export const updateLike = (id) => ({
    type: actionTypes.UPDATE_LIKE,
    payload: {
        id: id
    }
})