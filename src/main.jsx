import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import {Root} from './router.jsx'
import {store} from './__data__'
import {connectMqtt} from './__data__/utils'

const app = <Provider store={store}>
    <Root/>
</Provider>

// надо глобально установить пакеты
// npm install sensors -g
// npm install mosca pino -g
// npm run mqttServer
connectMqtt(store.dispatch)

ReactDOM.render(
    app,
    document.getElementById('app')
)
