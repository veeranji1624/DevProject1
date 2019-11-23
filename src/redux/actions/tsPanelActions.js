/*  eslint-disable  */
import axios from 'axios'
import {  
  GET_TS_PANEL,
  ADD_TS_PANEL,
  UPDATE_TS_PANEL,
  DELETE_TS_PANEL,
  NOTIFY_PANEL,
  GET_ERRORS
} from './types'
import {
  ALL_PANEL,
  CREATE_PANEL,
  UPDATE_PANEL,
  DELETE_PANEL
} from '../../utils/routes'

export const addTsPanel = (data, history) => dispatch=> {
  axios.post(CREATE_PANEL, data, {withCredentials: true})
    .then(res => {
      console.log(res.data);
      dispatch({
        type: ADD_TS_PANEL,
        payload: res.data
      })
      setTimeout(() => {
        history.push('/employee/techscreening');
        dispatch({
          type: NOTIFY_PANEL,
          payload: null
        })
      }, 2000)
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.message
      })
    })
}

export const getTsPanel = () => dispatch => {
  axios.get(ALL_PANEL, {withCredentials: true})
    .then(res => {
      dispatch({
        type: GET_TS_PANEL,
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

export const updateTsPanel = (data, history) => dispatch => {
  axios.post(UPDATE_PANEL, data, {withCredentials: true})
    .then(res => {
      dispatch({
        type: UPDATE_TS_PANEL,
        payload: res.data
      })
      setTimeout(() => {
        history.push('/employee/techscreening');
        dispatch({
          type: NOTIFY_PANEL,
          payload: null
        })
      }, 2000)
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.message
      })
    })
}

export const deleteTsPanel = data => dispatch => {
  axios.post(DELETE_PANEL, data, {withCredentials: true})
    .then(res => {
      dispatch({
        type: DELETE_TS_PANEL,
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