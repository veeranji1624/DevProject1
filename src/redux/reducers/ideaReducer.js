import {
  ADD_NEW_IDEA,
  GET_IDEA_LIST,
  UPDATE_IDEA_ITEM,
  SEARCH_IDEA_ITEM,
  SET_MESSAGE
} from '../actions/types'
const initialState = {
  data: [],
  item: {},
  message: null
};

export default function(state = initialState, action){
  switch(action.type){
    case ADD_NEW_IDEA:
      return {
        ...state,
        data: action.payload
      }
    case GET_IDEA_LIST:
      return {
        ...state,
        data: action.payload
      };
    case UPDATE_IDEA_ITEM:
      return {
        ...state,
        item: action.payload
      }
    case SEARCH_IDEA_ITEM:
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