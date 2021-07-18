import { combineReducers } from "redux";

import usersReducer from "../pages/users/UsersReducer";
import moviesReducer from "../pages/movies/MoviesReducer";
import SplashScreenReducer from "../pages/SplashScreen/SplashscreenReducer";

const rootReducer = combineReducers({
    moviesReducer: moviesReducer,
    usersReducer: usersReducer,
    SplashScreenReducer: SplashScreenReducer
})

export default rootReducer