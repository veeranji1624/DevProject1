import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { authenticateUser } from '../../../redux/actions/authAction'
import {
  Card,
  Form,
  FormText
} from 'reactstrap'
import {
  FormValidator,
  emailChecker
} from '.././../common/FormValidator'
import FormComponent from '../../common/FormComponent'
import ErrorNotifier from '../../aside/ErrorNotifier'

class EmployeeLogin extends Component {
  constructor(){
    super();
    this.state = {
      empId: '',
      Epassword: '',
      formErrors: {
        email: '',
        password: ''
      },      
      error : null
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }  
  onChange(e){
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onBlur(e){
    const { name, value } = e.target;
    let errors = this.state.formErrors;

    switch(name){
      // case 'Eemail':
      //   errors.email = emailChecker.test(value)? '': `The email ${value} is not valid`;
      //   break;
      case 'Epassword':
        errors.password = value.length < 4? 'Provide a valid password (4 or more characters)': '';
        break;
      default:
        break
    }
    this.setState({
      formErrors: errors
    })    
  }
  onSubmit(e){
    e.preventDefault();
    if(FormValidator(this.state)){
      this.setState({error: ''})
      let newUser = {
        empId: this.state.empId,
        password: this.state.Epassword
      }
      this.props.authenticateUser(newUser)
    }else{
      this.setState({
        error: 'Please provide the required details'
      })
      setTimeout(() => {
        this.setState({
          error: null
        })
      }, 5000)
    }
  }
  render() {
    console.log(this.props.isAuthenticated)
    if(this.props.isAuthenticated){
      this.props.history.push('/employee');
    }
    const { email, password } = this.state.formErrors;
    console.log(this.state);
    return (
      <div id="employee-login">
        <Card className="login-card center">
          <div className="center login-icon-wrap">
            <i className="material-icons login-icon">account_circle</i>
          </div>
          <h4 className="center blue-text">Employee Login</h4>
          <Form onSubmit={this.onSubmit} className="login-form" noValidate>
            <FormComponent
              type="text"
              name="empId"
              error={email}
              placeholder="Email Id"
              value={this.state.empId}
              change={this.onChange}
              blur={this.onBlur}
            />            
            <FormComponent
              type="password"
              name="Epassword"              
              placeholder="Password"
              value={this.state.Epassword}
              change={this.onChange}
              blur={this.onBlur}
              error={password}
            />            
            <button type="submit" className="btn login-button white-text">Login</button>
            <FormText className="error">{this.props.errors.error}</FormText>
          </Form>
          <div className="center blue-text pointer">Forgot password?</div>
        </Card>
        {this.state.error && <ErrorNotifier message={this.state.error} />}
      </div>
    )
  }
}

EmployeeLogin.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

function mapStateToProps(state){
 return {
    user: state.auth.user,
    isAuthenticated:state.auth.isAuthenticated,
    errors: state.errors
  }
}

export default connect(
    mapStateToProps,
    { authenticateUser }
  )(withRouter(EmployeeLogin));
