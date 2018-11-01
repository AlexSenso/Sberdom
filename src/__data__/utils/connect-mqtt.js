import mqtt from 'mqtt'
import _ from 'lodash'
import {TOPIC, CONNECTION_URL, RECONNECT_TIMEOUT } from '../constants'
import { MQTT_CONNECT_FAILURE, MQTT_CONNECT_SUCCESS, MQTT_SUBSCRIBE_SUCCESS, MQTT_SUBSCRIBE_FAILURE, MQTT_RECIEVE_MESSAGE } from '../action-types'

export const connectMqtt = (dispatch) => {

    debugger
    const client = mqtt.connect(CONNECTION_URL,
        {
            connectTimeout: RECONNECT_TIMEOUT,
            username: 'mqtt_client',
            password: 'sberhack',
            protocolId: 'ws',
        })

    client.on('connect', function () {
        debugger
        dispatch({ type: MQTT_CONNECT_SUCCESS })

        client.subscribe(TOPIC, function (err) {
            const actionType = !_.isEmpty(err) ? MQTT_SUBSCRIBE_FAILURE : MQTT_SUBSCRIBE_SUCCESS

            dispatch({ type: actionType })
        })
    })

    client.on('message', function (topic, message) {
        debugger
        dispatch({ type: MQTT_RECIEVE_MESSAGE, topic, message })
        //client.end()
    })

    client.on('error', function (error) {
        debugger
        dispatch({ type: MQTT_CONNECT_FAILURE, error })
    })
}