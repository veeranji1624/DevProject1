/*  eslint-disable  */
import axios from 'axios'
import {  
  GET_TS_JOBS,
  ADD_TS_JOBS,
  UPDATE_TS_JOBS,
  DELETE_TS_JOBS,
  NOTIFY_JOBS,
  GET_ERRORS
} from './types'
import {
  ALL_JOBS,
  CREATE_JOB,
  UPDATE_JOB,
  DELETE_JOB
} from '../../utils/routes'

export const addTsJob = (data, history) => dispatch=> {
  axios.post(CREATE_JOB, data, {withCredentials: true})
    .then(res => {      
      dispatch({
        type: ADD_TS_JOBS,
        payload: res.data
      })
      setTimeout(() => {
        history.push('/employee/techscreening');
        dispatch({
          type: NOTIFY_JOBS,
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

export const getTsJobs = () => dispatch => {
  axios.get(ALL_JOBS, {withCredentials: true})
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_TS_JOBS,
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

export const updateTsJob = (data, history) => dispatch => {
  axios.post(UPDATE_JOB, data, {withCredentials: true})
    .then(res => {      
      dispatch({
        type: UPDATE_TS_JOBS,
        payload: res.data
      })
      setTimeout(() => {
        dispatch({
          type: NOTIFY_JOBS,
          payload: null
        })
        history.push('/employee/techscreening');
      }, 2000)
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.message
      })
    })
}

export const deleteTsJob = data => dispatch => {
  axios.post(DELETE_JOB, data, {withCredentials: true})
    .then(res => {
      console.log(res.data);
      dispatch({
        type: DELETE_TS_JOBS,
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