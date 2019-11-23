/*  eslint-disable  */
import axios from 'axios'
import {
  ADD_NEW_CUSTOMER,
  GET_CUSTOMER_LIST,
  UPDATE_CUSTOMER,
  CUSTOMER_SEARCH,
  GET_ERRORS
} from './types'
import {
  ADD_COMPANY,
  GET_COMPANY,
  UPDATE_COMPANY,
  SEARCH_CUSTOMERS
} from '../../utils/routes'
import { setMessage } from './salesActions'

export const addCompany = (data, history) => dispatch=> {
  axios.post(ADD_COMPANY, data, {withCredentials: true})
    .then(res => {      
      dispatch(setMessage(res.data));
      setTimeout(() => {
        dispatch(setMessage(null));
        history.push('/employee/customers');
      }, 2000);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.message
      })
    })
}

export const getCustomers = () => dispatch => {
  axios.get(GET_COMPANY, {withCredentials: true})
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_CUSTOMER_LIST,
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

export const updateCustomer = (data, history) => dispatch => {
  axios.post(UPDATE_COMPANY, data, {withCredentials: true})
    .then(res => {
      dispatch(setMessage(res.data));
      setTimeout(() => {
        dispatch(setMessage(null));
        history.push('/employee/customers')
      }, 2000);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.message
      })
    })
}

export const searchCustomer = data => dispatch => {
  axios.post(SEARCH_CUSTOMERS, data, {withCredentials: true})
    .then(res => {
      dispatch({
        type: CUSTOMER_SEARCH,
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