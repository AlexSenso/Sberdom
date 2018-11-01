import _ from 'lodash'
import { FETCH_NOTIFICATIONS_REQUET, FETCH_NOTIFICATION_SUCCESS, FETCH_NOTIFICATION_FAILURE} from '../action-types'
import { STATUSES } from '../constants'

export function notification(state = {}, action) {
    switch (action.type) {
        case FETCH_NOTIFICATIONS_REQUET:
            return _.assign({}, state, { requestStatus: STATUSES.LOADING })
        case FETCH_NOTIFICATION_SUCCESS:
            return _.assign({}, state, { requestStatus: STATUSES.SUCCESS, notification: action.notification })
        case FETCH_NOTIFICATION_FAILURE:
            return _.assign({}, state, { requestStatus: STATUSES.FAILURE })
        default: return state
    }
}