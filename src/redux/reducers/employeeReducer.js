import {
  GET_EMPLOYEE_DETAILS,
  UPDATE_EMPLOYEE_DETAILS,
  SET_MESSAGE
} from '../actions/types'
const initialState = {
  data: {},
  message: null
};

export default function(state = initialState, action){
  switch(action.type){
    case GET_EMPLOYEE_DETAILS:
      return {
        ...state,
        data: action.payload
      };
    case SET_MESSAGE:
      return {
        ...state,
        data: action.payload
      }
    case UPDATE_EMPLOYEE_DETAILS:
      return {
        ...state,
        message: action.payload
      }
    default:
      return state;
  }
}