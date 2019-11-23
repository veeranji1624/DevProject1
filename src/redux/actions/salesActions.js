/*  eslint-disable  */
import axios from 'axios'
import {
  ADD_NEW_SALES,
  GET_SALES_LIST,
  UPDATE_SALES_ITEM,
  SEARCH_SALES_ITEM,
  SET_MESSAGE,
  GET_ERRORS
} from './types'
import {
  NEW_SALES,
  ALL_SALES,
  UPDATE_SALES,
  SEARCH_SALES
} from '../../utils/routes'

export const addSales = (data, history) => dispatch=> {
  axios.post(NEW_SALES, data, {withCredentials: true})
    .then(res => {
      setMessage(res.data);
      setTimeout(() => {
        setMessage(null);
        history.push('/employee/sales');
      }, 2000)
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.message
      })
    })
}

export const getSales = () => dispatch => {
  axios.get(ALL_SALES, {withCredentials: true})
    .then(res => {
      dispatch({
        type: GET_SALES_LIST,
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

export const updateSales = (data, history) => dispatch => {
  axios.post(UPDATE_SALES, data, {withCredentials: true})
    .then(res => {      
      dispatch(setMessage(res.data));
      setTimeout(() => {
        dispatch(setMessage(null));
        if(history){history.push('/employee/sales');}
      }, 2000);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.message
      })
    })
}

export const searchSales = data => dispatch => {
  axios.post(SEARCH_SALES, data, {withCredentials: true})
    .then(res => {
      dispatch({
        type: SEARCH_SALES_ITEM,
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

export const setMessage = data => {
  return {
    type: SET_MESSAGE,
    payload: data
  }
}