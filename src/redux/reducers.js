import { combineReducers } from "redux";

import usersReducer from "../pages/users/UsersReducer";
import moviesReducer from "../pages/movies/MoviesReducer";

const rootReducer = combineReducers({
    moviesReducer: moviesReducer,
    usersReducer: usersReducer
})

export default rootReducer