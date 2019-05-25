/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import { catalog, feedbacks } from './initData';
import { CHANGE_USERNAME } from './constants';
import {
  MQTT_CONNECT_FAILURE,
  MQTT_CONNECT_SUCCESS, MQTT_RECIEVE_MESSAGE, MQTT_RECIEVE_MESSAGE_MOTION,
  MQTT_SUBSCRIBE_FAILURE,
  MQTT_SUBSCRIBE_SUCCESS
} from "../../mqtt/action-types";
import {STATUSES} from "../../mqtt/constants";

// The initial state of the App
export const initialState = fromJS({
  username: '',
  catalog,
  feedbacks,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      // Delete prefixed '@' from the github username
      return state.set('username', action.name.replace(/@/gi, ''));
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
    case MQTT_RECIEVE_MESSAGE_MOTION:
      return _.assign({}, state, { [action.topic ]: action.message })
    default:
      return state;
  }
}

export default homeReducer;
