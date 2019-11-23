import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  HOME,
  TIME_IN,
  TIME_OUT
} from '../../utils/routes'

const timeIn = () => {
  //const location = window.navigator && window.navigator.geolocation;
  const data = {
    empId: localStorage.getItem('id')
  }
  axios.post(TIME_IN, data, {withCredentials: true})
    .then(res => {
      window.alert('Attendence Updated')
    })
    .catch(err => {
      window.alert('Request failed')
    })
}

const timeOut = () => {
  const data = {
    empId: localStorage.getItem('id')
  }
  axios.post(TIME_OUT, data, {withCredentials: true})
    .then(res => {
        window.alert('Attendence Updated');
    })
    .catch(err => {
      window.alert('Request failed');
    })
}
const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location = HOME;
}
const AccountBox = ({click, name}) => {
  let designation = localStorage.getItem('role');
  let user = name.split(' ').map(item => item.charAt(0)).join('').toUpperCase();  

  return (
    <div onMouseLeave={() => click()}>
      <div className="account-card center">
        <div className="account-name">
          <span className="user-circle">{user}</span>
          <h6 className="m-2">{ designation? designation: null }</h6>
        </div>
        <div className="left">
          <Link to="/employee/myprofile" className="no-dec">
            <div className="box-label flex-left pointer">
              <i className="material-icons">account_circle</i>
              <span className="ml-3">My Profile</span>
            </div>            
          </Link>
          <Link to="/employee/profile/edit" className="no-dec">
            <div className="box-label pointer flex-left">
              <i className="material-icons">settings</i>
              <span className="no-dec ml-3" to="/employee/profile/edit">Update Profile</span>
            </div>
          </Link>
          <Link to="/employee/edit/password" className="no-dec">
            <div className="box-label pointer flex-left">
              <i className="material-icons">security</i>
              <span className="no-dec ml-3" to="/employee/edit/password">Change Password</span>
            </div>
          </Link>
          <div className="pointer flex-left box-label">
            <i className="material-icons">lock</i>
            <span className="box-label pointer" onClick={ logout }>Log out</span>
          </div>
          <hr />
          <div className="attendance-box">          
            <span
              className="start-shift pointer"
              onClick={ timeIn }>
              <i className="material-icons">timer</i>
              <span>Time In</span>
            </span>
            <span
              className="end-shift pointer"
              onClick={ timeOut }>
              <i className="material-icons">timer_off</i>
              <span>Time Out</span>  
            </span>
          </div>
        </div>
      </div>      
    </div>
  )
}

export default AccountBox;