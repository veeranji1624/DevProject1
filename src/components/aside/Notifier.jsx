import React from 'react'

function Notifier(props) {
  //let div = `notification-box ${props.class}`;
  return (
    <div className="notification-box">
      <span className="notification">
        <i className="material-icons">offline_pin</i>
        {props.message}
      </span>
    </div>
  )
}
export default Notifier;