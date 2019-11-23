import axios from 'axios'
import {
//   ADD_NEW_CUSTOMER,
  GET_ACCESS_LIST,
//   UPDATE_CUSTOMER,
//   CUSTOMER_SEARCH,
   GET_ERRORS
} from './types'
import {API} from '../../utils/routes'

export const getAccess = () => dispatch => {
    axios.get(`${API}/access/fetch`, {withCredentials: true})
      .then(res => {
        console.log(res.data);
        dispatch({
          type: GET_ACCESS_LIST,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.message
        })
      })
  }