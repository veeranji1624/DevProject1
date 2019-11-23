import { combineReducers } from 'redux'
import authReducer from './authReducer'
import registerReducer from './registerReducer'
import employeeReducer from './employeeReducer'
import ideaReducer from './ideaReducer'
import customerReducer from './customerReducer'
import salesReducer from './salesReducer'
import leadsReducer from './leadsReducer'
import inquiryReducer from './inquiryReducer'
import projectReducer from './projectReducer'
import saveTimesheetReducer from './saveTimesheetReducer'
import tsJobReducer from './tsJobReducer'
import tsCandidateReducer from './tsCandidateReducer'
import tsPanelReducer from './tsPanelReducer'
import errorReducer from './errorReducer'
import accessReducer from './accessReducer'

export default combineReducers({
  auth: authReducer,
  reg: registerReducer,  
  employee: employeeReducer,
  idea: ideaReducer,
  customers: customerReducer,
  sales: salesReducer,
  leads: leadsReducer,
  inquiries: inquiryReducer,
  projects: projectReducer,
  savedTS: saveTimesheetReducer,
  tsJobs: tsJobReducer,
  tsCandidates: tsCandidateReducer,
  tsPanel: tsPanelReducer,
  errors: errorReducer,
  access: accessReducer
})