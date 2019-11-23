import axios from 'axios'
import {
  REGISTER_NEW_USER,
  GET_ERRORS
} from './types'

export const registerUser = (userData) => dispatch => {
  axios.post(
    '/register',
    userData
  )
    .then(res => dispatch({
      type: REGISTER_NEW_USER,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err
    }))
}