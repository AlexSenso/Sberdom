import { createStore as createReduxStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'

import * as reducers from './reducers'


export function createStore () {
    const combinedReducers = combineReducers(reducers)
    const composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // eslint-disable-line no-underscore-dangle
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ // eslint-disable-line no-underscore-dangle
                name: require('../../package.json').description // eslint-disable-line global-require
            }) : compose

    return composeEnhancers(applyMiddleware(thunkMiddleware))(createReduxStore)(combinedReducers, {})
}

export default createStore()