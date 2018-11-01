import axios from 'axios'
import { API_URL } from '../constants'
import { FETCH_SMART_BOX_REQUET, FETCH_SMART_BOX_SUCCESS, FETCH_SMART_BOX_FAILURE } from '../action-types'

export function fetchSmartBox (dispatch) {
    dispatch({ type: FETCH_SMART_BOX_REQUET})
    axios.post(`${API_URL}/getMoneyBoxes`, {})
        .then((responce) => dispatch({ type: FETCH_SMART_BOX_SUCCESS, ...responce.data }))
        .catch(() => dispatch({ type: FETCH_SMART_BOX_FAILURE }))

}