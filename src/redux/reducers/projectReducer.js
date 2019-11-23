import {
  ADD_NEW_PROJECT,
  GET_PROJECT_LIST,
  UPDATE_PROJECT_ITEM,
  SEARCH_PROJECT_ITEM,
  SET_MESSAGE
} from '../actions/types'
const initialState = {
  data: [],
  message: null
};

export default function(state = initialState, action){
  switch(action.type){
    case ADD_NEW_PROJECT:
      return {
        ...state,
        data: action.payload
      }
    case GET_PROJECT_LIST:
      return {
        ...state,
        data: action.payload
      };
    case UPDATE_PROJECT_ITEM:
      return {
        ...state,
        data: action.payload
      }
    case SEARCH_PROJECT_ITEM:
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