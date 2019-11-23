import {
  GET_TS_PANEL,
  ADD_TS_PANEL,
  UPDATE_TS_PANEL,
  DELETE_TS_PANEL,
  NOTIFY_PANEL
} from '../actions/types'
const initialState = {
  data: [],
  item: {},
  message: null
};

export default function(state = initialState, action){
  switch(action.type){
    case ADD_TS_PANEL:
      return {
        ...state,
        data: action.payload,
        message: 'Panel created successfully'
      }
    case GET_TS_PANEL:
      return {
        ...state,
        data: action.payload
      };
    case UPDATE_TS_PANEL:
      return {
        ...state,
        item: action.payload,
        message: 'Panel updated successfully',
      }
    case DELETE_TS_PANEL:
      return {
        ...state,
        data: action.payload,
        message: 'Panel deleted successfully'
      }
    case NOTIFY_PANEL:
      return {
        ...state,
        message: null
      }
    default:
      return state;
  }
}