import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class AuthChecker extends Component{
  render(){
    const username = localStorage.getItem('username');
    return(
      <div>
        {username
          ?<Route path={this.props.path} component={this.props.component} />
          :<h3>Unauthorized</h3>
        }
      </div>
    )
  }
}
AuthChecker.PropTypes = {
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(
  mapStateToProps,
  {}
)(AuthChecker);