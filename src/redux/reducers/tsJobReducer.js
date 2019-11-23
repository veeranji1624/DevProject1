import {
  GET_TS_JOBS,
  ADD_TS_JOBS,
  UPDATE_TS_JOBS,
  NOTIFY_JOBS,
  DELETE_TS_JOBS
} from '../actions/types'
const initialState = {
  data: [],
  item: {},
  message: null
};

export default function(state = initialState, action){
  switch(action.type){
    case ADD_TS_JOBS:
      return {
        ...state,
        data: action.payload,
        message: 'Job created successfully'
      }
    case GET_TS_JOBS:
      return {
        ...state,
        data: action.payload
      };
    case UPDATE_TS_JOBS:
      return {
        ...state,
        item: action.payload,
        message: 'Job updated successfully'
      }
    case DELETE_TS_JOBS:
      return {
        ...state,
        data: action.payload,
        message: 'Job deleted successfully'
      }
    case NOTIFY_JOBS:
      return {
        ...state,
        message: null
      }
    default:
      return state;
  }
}