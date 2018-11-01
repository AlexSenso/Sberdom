import axios from 'axios'
import { API_URL } from '../constants'
import { FETCH_NOTIFICATIONS_REQUET, FETCH_NOTIFICATION_SUCCESS, FETCH_NOTIFICATION_FAILURE} from '../action-types'

export function fetchNotification (dispatch) {
    dispatch({ type: FETCH_NOTIFICATIONS_REQUET})
    axios.post(`${API_URL}/pushNotification`, {})
        .then((responce) => dispatch({ type: FETCH_NOTIFICATION_SUCCESS, ...responce.data }))
        .catch(() => dispatch({ type: FETCH_NOTIFICATION_FAILURE }))

}