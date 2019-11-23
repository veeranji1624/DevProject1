import {
  GET_TS_CANDIDATES,
  ADD_TS_CANDIDATES,
  UPDATE_TS_CANDIDATES,
  DELETE_TS_CANDIDATES,
  NOTIFY_CANDIDATES
} from '../actions/types'
const initialState = {
  data: [],
  item: {},
  message: null
};

export default function(state = initialState, action){
  switch(action.type){
    case ADD_TS_CANDIDATES:
      return {
        ...state,
        data: state,
        message: 'Candidate created successfully'
      }
    case GET_TS_CANDIDATES:
      return {
        ...state,
        data: action.payload
      };
    case UPDATE_TS_CANDIDATES:
      return {
        ...state,
        item: action.payload, 
        message: 'Candidate updated successfully'
      }
    case DELETE_TS_CANDIDATES:
      return {
        ...state,
        data: action.payload,
        message: 'Candidate deleted successfully'
      }
    case NOTIFY_CANDIDATES:
      return {
        ...state,
        message: null
      }
    default:
      return state;
  }
}