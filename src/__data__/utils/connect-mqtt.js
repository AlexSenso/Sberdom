import mqtt from 'mqtt'
import _ from 'lodash'
import {TOPICS, CONNECTION_URL, RECONNECT_TIMEOUT } from '../constants'
import { MQTT_CONNECT_FAILURE, MQTT_CONNECT_SUCCESS, MQTT_SUBSCRIBE_SUCCESS, MQTT_SUBSCRIBE_FAILURE, MQTT_RECIEVE_MESSAGE } from '../action-types'

export const connectMqtt = (dispatch) => {
    const client = mqtt.connect(CONNECTION_URL,
        {
            connectTimeout: RECONNECT_TIMEOUT,
            username: 'mqtt_client',
            password: 'sberhack',
        })

    client.on('connect', function () {

        dispatch({ type: MQTT_CONNECT_SUCCESS })

        client.subscribe(TOPICS, function (err) {
            const actionType = !_.isEmpty(err) ? MQTT_SUBSCRIBE_FAILURE : MQTT_SUBSCRIBE_SUCCESS

            dispatch({ type: actionType })
        })
    })

    client.on('message', function (topic, message) {
        const decodedMessage = new TextDecoder('utf-8').decode(message)
        const parsedMessage = JSON.parse(decodedMessage)

        if(!_.has(parsedMessage, 'error')) {
            dispatch({ type: MQTT_RECIEVE_MESSAGE, topic, message: parsedMessage })
        }
    })

    client.on('error', function (error) {
        dispatch({ type: MQTT_CONNECT_FAILURE, error })
    })
}