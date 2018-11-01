import _ from 'lodash'
import { MQTT_CONNECT_FAILURE, MQTT_CONNECT_SUCCESS, MQTT_SUBSCRIBE_SUCCESS, MQTT_SUBSCRIBE_FAILURE, MQTT_RECIEVE_MESSAGE } from '../action-types'
import { STATUSES } from '../constants'

export function sensors (state={}, action) {
    switch (action.type) {
        case MQTT_CONNECT_SUCCESS:
            return _.assign({}, state, { connectStatus: STATUSES.SUCCESS})
        case MQTT_CONNECT_FAILURE:
            return _.assign({}, state, { connectStatus: STATUSES.FAILURE})
        case MQTT_SUBSCRIBE_SUCCESS:
            return _.assign({}, state, { subscribeStatus: STATUSES.SUCCESS})
        case MQTT_SUBSCRIBE_FAILURE:
            return _.assign({}, state, { subscribeStatus: STATUSES.FAILURE})
        case MQTT_RECIEVE_MESSAGE:
            return _.assign({}, state, { [action.topic ]: action.message })
        default: return state
    }
}