import {
  ADD_NEW_CUSTOMER,
  GET_CUSTOMER_LIST,
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
    case ADD_NEW_CUSTOMER:
      return {
        ...state,
        data: action.payload
      }
    case GET_CUSTOMER_LIST:
      return {
        ...state,
        data: action.payload
      };
    case UPDATE_CUSTOMER:
      return {
        ...state,
        data: action.payload
      }
    case CUSTOMER_SEARCH:
      return {
        ...state,
        data: action.payload
      }
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload
      }
    default:
      return state;
  }
}