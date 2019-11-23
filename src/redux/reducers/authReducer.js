import {
  AUTHENTICATE_USER,
  LOGOUT_USER
} from '../actions/types'

const initialState = {
  isAuthenticated: false,
  permissionlist: {}
}

export default function(state = initialState, action){
  switch(action.type){
    case AUTHENTICATE_USER:
      return {
        ...state,
        isAuthenticated: true,
        permissionlist: action.payload
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      };
      default:
        return state;
  }
}