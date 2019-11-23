import {
  ADD_NEW_LEAD,
  GET_LEADS_LIST,
  UPDATE_LEAD_ITEM,
  SEARCH_LEAD_ITEM,
  SET_MESSAGE
} from '../actions/types'
const initialState = {
  data: [],
  message: null
};

export default function(state = initialState, action){
  switch(action.type){
    case ADD_NEW_LEAD:
      return {
        ...state,
        data: action.payload
      }
    case GET_LEADS_LIST:
      return {
        ...state,
        data: action.payload
      };
    case UPDATE_LEAD_ITEM:
      return {
        ...state,
        data: action.payload
      }
    case SEARCH_LEAD_ITEM:
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