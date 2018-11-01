import _ from 'lodash'
import { MQTT_CONNECT_FAILURE, MQTT_CONNECT_SUCCESS, MQTT_SUBSCRIBE_SUCCESS, MQTT_SUBSCRIBE_FAILURE, MQTT_RECIEVE_MESSAGE } from '../action-types'

export function sensors (state={}, action) {
    switch (action.type) {
        case MQTT_CONNECT_SUCCESS:
            return _.assign({}, state, { connectStatus: 'success'})
        case MQTT_CONNECT_FAILURE:
            return _.assign({}, state, { connectStatus: 'failure'})
        case MQTT_SUBSCRIBE_SUCCESS:
            return _.assign({}, state, { subscribeStatus: 'success'})
        case MQTT_SUBSCRIBE_FAILURE:
            return _.assign({}, state, { subscribeStatus: 'failure'})
        case MQTT_RECIEVE_MESSAGE:
            return _.assign({}, state, { [action.topic ]: action.message })
        default: return state
    }
}