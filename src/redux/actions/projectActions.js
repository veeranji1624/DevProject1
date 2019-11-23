/*  eslint-disable  */
import axios from 'axios'
import {
  ADD_NEW_PROJECT,
  GET_PROJECT_LIST,
  UPDATE_PROJECT_ITEM,
  SEARCH_PROJECT_ITEM,
  GET_ERRORS
} from './types'
import {
  ALL_PROJECTS,
  NEW_PROJECT,
  UPDATE_PROJECT,
  SEARCH_PROJECTS
} from '../../utils/routes'
import { setMessage } from './salesActions'

export const addProject = data => dispatch=> {
  axios.post(NEW_PROJECT, data, {withCredentials: true})
    .then(res => {
      dispatch(setMessage(res.data));
      setTimeout(() => {
        dispatch(setMessage(null));
      }, 5000);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.message
      })
    })
}

export const getProjects = () => dispatch => {
  axios.post(ALL_PROJECTS, {withCredentials: true})
    .then(res => {
      dispatch({
        type: GET_PROJECT_LIST,
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

export const updateProject = data => dispatch => {
  axios.post(UPDATE_PROJECT, data, {withCredentials: true})
    .then(res => {
      dispatch(setMessage(res.data));
      setTimeout(() => {
        dispatch(setMessage(null));
      }, 5000);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.message
      })
    })
}

export const searchProjects = data => dispatch => {
  axios.post(SEARCH_PROJECTS, data, {withCredentials: true})
    .then(res => {
      dispatch({
        type: SEARCH_PROJECT_ITEM,
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