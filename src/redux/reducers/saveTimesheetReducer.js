import { SAVE_TIMESHEET } from '../actions/types'
const initialState = {
  isSaved: false,
  data: {}
}

export default function(state = initialState, action){
  switch(action.type){
    case SAVE_TIMESHEET:
      return {
        ...state,
        isSaved:true,
        data: action.payload
      };
    default:
      return state;
  }
}