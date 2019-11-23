import {
    // ADD_NEW_CUSTOMER,
    GET_ACCESS_LIST,
    UPDATE_CUSTOMER,
    CUSTOMER_SEARCH,
    SET_MESSAGE
  } from '../actions/types'
  const initialState = {
    data: [],
    message: null
  };
  export default function(state = initialState, action){
    switch(action.type){
      case GET_ACCESS_LIST:
        return {
          ...state,
          data: action.payload
        }
        default:
      return state;
  }
}