/*  eslint-disable  */
import axios from 'axios'
import {
  ADD_NEW_LEAD,
  GET_LEADS_LIST,
  UPDATE_LEAD_ITEM,
  SEARCH_LEAD_ITEM,
  GET_ERRORS
} from './types'
import {
  ADD_LEAD,
  GET_LEADS,
  UPDATE_LEAD,
  SEARCH_LEADS
} from '../../utils/routes'
import { setMessage } from './salesActions'

export const addLead = (data, history) => dispatch=> {
  axios.post(ADD_LEAD, data, {withCredentials: true})
    .then(res => {
      dispatch(setMessage(res.data));
      setTimeout(() => {
        dispatch(setMessage(null));
        history.push('/employee/marketing');
      }, 2000);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.message
      })
    })
}

export const getLeads = () => dispatch => {
  axios.get(GET_LEADS, {withCredentials: true})
    .then(res => {
      dispatch({
        type: GET_LEADS_LIST,
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

export const updateLead = (data, history) => dispatch => {
  axios.post(UPDATE_LEAD, data, {withCredentials: true})
    .then(res => {
      dispatch(setMessage(res.data));
      setTimeout(() => {
        dispatch(setMessage(null));
        if(history){history.push('/employee/marketing');}
      }, 2000);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.message
      })
    })
}

export const searchLeads = data => dispatch => {
  axios.post(SEARCH_LEADS, data, {withCredentials: true})
    .then(res => {
      dispatch({
        type: SEARCH_LEAD_ITEM,
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