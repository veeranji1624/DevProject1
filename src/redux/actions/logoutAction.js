import axios from 'axios'
import {
  LOGOUT_USER,
  GET_ERRORS
} from './types'

export const logoutUser = () => dispatch => {
  axios.get('/logout')
    .then(res => dispatch({
      type: LOGOUT_USER,
      payload: res.data
    }),
      localStorage.clear()
    )
  .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err
        }))
}