import React, { Component } from 'react'
import axios from 'axios'
import {
  Row,
  Col,
  Form
} from 'reactstrap'
import {
  EMPLOYEE_PASSPORT_DETAILS,
  UPDATE_PASSPORT_INFO
} from '../../../utils/routes'
import { Validator, submitValidator, errors } from '../../common/Validator'
import FormComponent from '../../common/FormComponent'
import Notifier from '../../aside/Notifier'
import ErrorNotifier from '../../aside/ErrorNotifier'

class PassportDetails extends Component {
  constructor(){
    super();
    this.state = {
      data: {
        firstName: '',
        middleName: '',
        lastName: '',
        issueDate: '',
        expiryDate: '',
        placeOfIssue: '',
        city: '',
        country: '',
        passportNumber:''
      },
      message: '',
      error: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);   
  }
  componentDidMount(){
    const data = {
      empid: localStorage.getItem('id')
    }
    axios.post(EMPLOYEE_PASSPORT_DETAILS, data, {withCredentials: true})
      .then(res => {
        if(res.data[0]){
          this.setState({
            data: res.data[0]
          })
        }
      })
  }
  onChange(e){
    e.preventDefault();
    Validator(e.target);
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name] : e.target.value
      }
    })
  }
  onSubmit(e){
    e.preventDefault();
    submitValidator(e.target);
    let { data } = this.state;
    let details = {
      empId: localStorage.getItem('id'),
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      issueDate: data.issueDate,
      expiryDate: data.expiryDate,
      placeOfIssue: data.placeOfIssue,
      city: data.city,
      country: data.country,
      passportNumber: data.passportNumber
    }
    if(errors.valid){
      axios.post(UPDATE_PASSPORT_INFO, details, {withCredentials: true})
        .then(res => {
          this.setState({
            message: 'Updated Successfully'
          })
          setTimeout(() => {
            this.props.back();
          }, 2000)
        })
        .catch(err => {
          this.setState({
            error: 'Could not update'
          })          
        })
        setTimeout(() => {
          this.setState({
            message: '',
            error: ''
          })
        }, 5000)
    }else{
      this.setState({
        error: 'Enter all mandatory fields'
      })
      setTimeout(() => {
        this.setState({
          error: ''
        })
      }, 5000)
    }
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <h5 className="bold center">Passport Details</h5>
        <Form onSubmit={this.onSubmit} className="p-3" noValidate>
          <Row>
            <Col md="6">
              <FormComponent
                labelClass="bold label-sm"
                label="First Name"
                type="text"
                name="firstName"
                inputClass="form-control-sm"
                value={data&&data.firstName}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Middle Name"
                type="text"
                name="middleName"
                inputClass="form-control-sm"
                value={data&&data.middleName}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Last Name"
                type="text"
                name="lastName"
                inputClass="form-control-sm"
                value={data&&data.lastName}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Date Of Issue"
                type="date"
                name="issueDate"
                inputClass="form-control-sm"
                value={data&&data.issueDate}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Date Of Passport Expiry"
                type="date"
                name="expiryDate"
                inputClass="form-control-sm"
                value={data&&data.expiryDate}
                change={this.onChange}
                required={true}
              />
            </Col>
            <Col md="6">
              <FormComponent
                labelClass="bold label-sm"
                label="Place Of Issue"
                type="text"
                name="placeOfIssue"
                inputClass="form-control-sm"
                value={data&&data.placeOfIssue}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="City"
                type="text"
                name="city"
                inputClass="form-control-sm"
                value={data&&data.city}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Country"
                type="text"
                name="country"
                inputClass="form-control-sm"
                value={data&&data.country}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Passport Number"
                type="text"
                name="passportNumber"
                inputClass="form-control-sm"
                value={data&&data.passportNumber}
                change={this.onChange}
                required={true}
              />
            </Col>
          </Row>
          <div className="center">
            <button type="submit" className="btn login-button white-text">Update Profile</button>
          </div>
        </Form>
        {this.state.message? <Notifier message={this.state.message} />: null}
        {this.state.error? <ErrorNotifier message={this.state.error} />: null}
      </div>
    )
  }
}
export default PassportDetails;