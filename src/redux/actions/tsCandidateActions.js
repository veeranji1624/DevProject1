/*  eslint-disable  */
import axios from 'axios'
import {  
  GET_TS_CANDIDATES,
  ADD_TS_CANDIDATES,
  UPDATE_TS_CANDIDATES,
  DELETE_TS_CANDIDATES,
  NOTIFY_CANDIDATES,
  GET_ERRORS
} from './types'
import {
  ALL_CANDIDATES,
  CREATE_CANDIDATE,
  UPDATE_CANDIDATE,
  SEARCH_CANDIDATES,
  DELETE_CANDIDATE,
  CANDIDATE_RESUME_UPLOAD,
} from '../../utils/routes'

export const addTsCandidate = (data, history) => dispatch=> {
  axios.post(CANDIDATE_RESUME_UPLOAD, data.profile, {withCredentials: true})
    .then(res => {
      console.log(res.data)
      data.candId = res.data.candId;
      axios.post(CREATE_CANDIDATE, data, {withCredentials: true})
        .then(res => console.log('done'));
      dispatch({
        type: ADD_TS_CANDIDATES,
        payload: res.data
      })
      setTimeout(() => {
        history.push('/employee/techscreening');
        dispatch({
          type: NOTIFY_CANDIDATES,
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

export const getTsCandidates = data => dispatch => {
  axios.get(ALL_CANDIDATES, {withCredentials: true})
    .then(res => {
      dispatch({
        type: GET_TS_CANDIDATES,
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

export const updateTsCandidate = (data, history, path) => dispatch => {
  console.log('request', data);
  axios.post(UPDATE_CANDIDATE, data, {withCredentials: true})
    .then(res => {
      console.log('response', res.data);
      dispatch({
        type: UPDATE_TS_CANDIDATES,
        payload: res.data
      })      
      setTimeout(() => {
        if(history && path){
          history.push(path);
        }
        dispatch({
          type: NOTIFY_CANDIDATES,
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

export const searchTsCandidates = data => dispatch => {
  axios.post(SEARCH_CANDIDATES, data, {withCredentials: true})
    .then(res => {
      dispatch({
        type: GET_TS_CANDIDATES,
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

export const deleteTsCandidate = data => dispatch => {
  axios.post(DELETE_CANDIDATE, data, {withCredentials: true})
    .then(res => {
      dispatch({
        type: DELETE_TS_CANDIDATES,
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