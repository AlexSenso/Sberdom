import { createStore as createReduxStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { sensors } from './reducers'

export function createStore () {
    const composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // eslint-disable-line no-underscore-dangle
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ // eslint-disable-line no-underscore-dangle
                name: require('../../package.json').description // eslint-disable-line global-require
            }) : compose

    return composeEnhancers(applyMiddleware(thunkMiddleware))(createReduxStore)(sensors, {})
}

export default createStore()