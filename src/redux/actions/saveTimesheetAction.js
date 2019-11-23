import {
  SAVE_TIMESHEET
} from './types'

export const logoutUser = (data) => dispatch => {
   dispatch({
      type: SAVE_TIMESHEET,
      payload: data
    })
}