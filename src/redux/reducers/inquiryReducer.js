import {
  ADD_NEW_INQUIRY,
  GET_INQUIRY_LIST,
  UPDATE_INQUIRY_ITEM,
  SEARCH_INQUIRY_ITEM,
  SET_MESSAGE
} from '../actions/types'
const initialState = {
  data: [],
  message: null
};

export default function(state = initialState, action){
  switch(action.type){
    case ADD_NEW_INQUIRY:
      return {
        ...state,
        data: action.payload
      }
    case GET_INQUIRY_LIST:
      return {
        ...state,
        data: action.payload
      };
    case UPDATE_INQUIRY_ITEM:
      return {
        ...state,
        data: action.payload
      }
    case SEARCH_INQUIRY_ITEM:
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