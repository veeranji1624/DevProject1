/*  eslint-disable  */
import axios from 'axios'
import {
  ADD_NEW_IDEA,
  GET_IDEA_LIST,
  UPDATE_IDEA_ITEM,
  SEARCH_IDEA_ITEM,
  GET_ERRORS
} from './types'
import {
  GET_IDEAS,
  NEW_IDEA,
  UPDATE_IDEA,
  SEARCH_IDEA
} from '../../utils/routes'
import { setMessage } from './salesActions'

export const addIdea = (data, history) => dispatch => {
  axios.post(NEW_IDEA, data, {withCredentials: true})
    .then(res => {
      dispatch(setMessage(res.data));
      setTimeout(() => {
        dispatch(setMessage(null));
        history.push('/employee/ideas')
      }, 2000);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.message
      })
    })
}

export const getIdea = () => dispatch => {
  axios.get(GET_IDEAS, {withCredentials: true})
    .then(res => {
      dispatch({
        type: GET_IDEA_LIST,
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

export const updateIdea = (data, history) => dispatch => {
  axios.post(UPDATE_IDEA, data, {withCredentials: true})
    .then(res => {
      dispatch(setMessage(res.data));
      setTimeout(() => {
        dispatch(setMessage(null));
        history.push('/employee/ideas');
      }, 2000);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.message
      })
    })
}

export const searchIdea = data => dispatch => {
  axios.post(SEARCH_IDEA, data, {withCredentials: true})
    .then(res => {
      dispatch({
        type: SEARCH_IDEA,
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