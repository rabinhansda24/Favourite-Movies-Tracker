import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['usersReducer'], // Save
    blacklist: [] // Does not save
}

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Redux store
const store = createStore(
    persistedReducer,
    compose(
        applyMiddleware(
            createLogger(),
            thunk
        )
    )
)


let persistor = persistStore(store)

export {store, persistor}

