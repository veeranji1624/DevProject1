import React, { Component } from 'react'
import axios from 'axios'
import {
  Container,
  Row,
  Col,
  Form
} from 'reactstrap'
import { CHANGE_PASSWORD } from '../../../../utils/routes'
import { Validator, submitValidator, errors } from '../../../common/Validator'
import FormComponent from '../../../common/FormComponent'
import Notifier from '../../../aside/Notifier'
import ErrorNotifier from '../../../aside/ErrorNotifier'

class ChangePassword extends Component {
  constructor(){
    super();
    this.state = {
      password: '',
      newPassword: '',
      newPassword2: '',      
      message: null,
      error: null
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);    
  }  

  onChange(e){
    e.preventDefault();
    Validator(e.target);
    let { name, value } = e.target;
    this.setState({
      [name]: value,      
    })
  }
  onSubmit(e){
    e.preventDefault();
    submitValidator(e.target);
    if(errors.valid){
      if(this.state.newPassword === this.state.newPassword2){
        const data = {
          empid: localStorage.getItem('id'),
          currentpassword: this.state.password,
          newpassword: this.state.newPassword
        }
        axios.post(
          CHANGE_PASSWORD,
          data,
          {withCredentials: true}
          )
          .then(res => {
            this.setState({
              message: 'Updated SuccessFully'
            })
            setTimeout(() => {
              this.setState({
                message: null              
              })
            }, 5000)
          })
          .catch(err => {
            this.setState({
              error: 'Could not change password'
            })
            setTimeout(() => {
              this.setState({              
                error: null
              })
            }, 5000)
          })
        }else{
          this.setState({
            error:  'Passwords do not match'
          })
          setTimeout(() => {
            this.setState({
              error: null
            })
          }, 5000)
        }
    }else{
      this.setState({                
        error: 'Please enter the required details'
      })
      setTimeout(() => {
        this.setState({
          error: null
        })
      }, 5000)
    }
  }
  render() {
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';
    return (
      <div className={shrink}>
        {this.state.message?<Notifier message={this.state.message} />:null}
        {this.state.error?<ErrorNotifier message={this.state.error} />:null}
        <Container className="card container-card">
          <h4 className="bold center pt-2">
            Change Password
          </h4>
          <Row>
            <Col md="2"></Col>
            <Col md="8">
              <Form className="p-3" onSubmit={this.onSubmit} noValidate>
                <FormComponent
                  labelClass="bold label-sm"
                  label="Current Password"
                  type="password"
                  name="password"
                  inputClass="form-control-sm"
                  value={this.state.password}
                  change={this.onChange}
                  required={true}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  label="New Password"
                  type="password"
                  name="newPassword"
                  value={this.state.newPassword}
                  change={this.onChange}
                  required={true}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  label="Confirm Password"
                  type="password"
                  name="newPassword2"
                  value={this.state.newPassword2}
                  change={this.onChange}
                  required={true}
                />
                <div className="center">
                  <button className="btn login-button white-text">Change Password</button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
export default ChangePassword;