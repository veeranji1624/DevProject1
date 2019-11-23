import React from 'react'

function ErrorNotifier(props) {
  return (
    <div className="error-notification-box">
      <span className="error-notification">
        <i className="material-icons">error</i>
        {props.message}
      </span>
    </div>
  )
}
export default ErrorNotifier;