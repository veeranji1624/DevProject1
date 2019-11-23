import {
  ADD_NEW_SALES,
  GET_SALES_LIST,
  UPDATE_SALES_ITEM,
  SEARCH_SALES_ITEM,
  SET_MESSAGE
} from '../actions/types'
const initialState = {
  data: [],
  message: null
};

export default function(state = initialState, action){
  switch(action.type){
    case ADD_NEW_SALES:
      return {
        ...state,
        data: action.payload
      }
    case GET_SALES_LIST:
      return {
        ...state,
        data: action.payload
      };
    case UPDATE_SALES_ITEM:
      return {
        ...state,
        data: action.payload
      }
    case SEARCH_SALES_ITEM:
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