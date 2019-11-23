import axios from 'axios'
import {
  GET_EMPLOYEE_DETAILS,
  UPDATE_EMPLOYEE_DETAILS,
  GET_ERRORS
} from './types'
import {
  EMPLOYEE_DETAILS,
  EMPLOYEE_UPDATE
} from '../../utils/routes'

export const getEmployeeDetails = data => dispatch => {
  axios.post(EMPLOYEE_DETAILS, data, {withCredentials: true})
    .then(res => {
      dispatch({
        type: GET_EMPLOYEE_DETAILS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    })
}

export const updateEmployee = data => dispatch => {
  axios.post(EMPLOYEE_UPDATE, data,{withCredentials: true})
    .then(res => {
      dispatch({
        type: UPDATE_EMPLOYEE_DETAILS,
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