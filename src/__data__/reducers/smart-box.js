import _ from 'lodash'
import { FETCH_SMART_BOX_REQUET, FETCH_SMART_BOX_SUCCESS, FETCH_SMART_BOX_FAILURE } from '../action-types'
import { STATUSES } from '../constants'

export function smartBox (state={}, action) {
    switch (action.type) {
        case FETCH_SMART_BOX_REQUET:
            return _.assign({}, state, {requestStatus: STATUSES.LOADING})
        case FETCH_SMART_BOX_SUCCESS:
            return _.assign({}, state, {requestStatus: STATUSES.SUCCESS, smartBox: action['smart_box']})
        case FETCH_SMART_BOX_FAILURE:
            return _.assign({}, state, {requestStatus: STATUSES.FAILURE})
        default:
            return state
    }
}