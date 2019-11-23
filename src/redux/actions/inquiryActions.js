/*  eslint-disable  */
import axios from 'axios'
import {
  ADD_NEW_INQUIRY,
  GET_INQUIRY_LIST,
  UPDATE_INQUIRY_ITEM,
  SEARCH_INQUIRY_ITEM,
  GET_ERRORS
} from './types'
import {
  CONTACTS,
  CONTACT_US,
  UPDATE_CONTACT,
  SEARCH_INQUIRY
} from '../../utils/routes'
import { setMessage } from './salesActions'

export const addInquiry = (data, history) => dispatch=> {
  axios.post(CONTACT_US, data, {withCredentials: true})
    .then(res => {
      dispatch(setMessage(res.data));
      setTimeout(() => {
        dispatch(setMessage(null));
        history.push('/employee/inquiries')
      }, 2000);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.message
      })
    })
}

export const getInquiries = () => dispatch => {
  axios.get(CONTACTS, {withCredentials: true})
    .then(res => {      
      dispatch({
        type: GET_INQUIRY_LIST,
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

export const updateInquiry = (data, history) => dispatch => {
  axios.post(UPDATE_CONTACT, data, {withCredentials: true})
    .then(res => {      
      dispatch(setMessage(res.data));
      setTimeout(() => {
        dispatch(setMessage(null));
        if(history){history.push('/employee/inquiries');}
      }, 2000);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.message
      })
    })
}

export const searchInquiries = data => dispatch => {
  axios.post(SEARCH_INQUIRY, data, {withCredentials: true})
    .then(res => {
      dispatch({
        type: SEARCH_INQUIRY_ITEM,
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