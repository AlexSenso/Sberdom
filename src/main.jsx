import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import {Root} from './router.jsx'
import {store} from './__data__'
import {connectMqtt} from './__data__/utils'
//import { fetchNotification } from './__data__/actions'


connectMqtt(store.dispatch)
//fetchNotification(store.dispatch)

const app = <Provider store={store}>
    <Root/>
</Provider>

ReactDOM.render(
    app,
    document.getElementById('app')
)
