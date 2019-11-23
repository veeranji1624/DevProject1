import React, { Component } from 'react'
import axios from 'axios'
import {
  Row,
  Col,
  Form
} from 'reactstrap'
import {
  EMPLOYEE_BANK_DETAILS,
  UPDATE_BANK_INFO
} from '../../../utils/routes'
import FormComponent from '../../common/FormComponent'
import { Validator, submitValidator, errors } from '../../common/Validator'
import Notifier from '../../aside/Notifier'
import ErrorNotifier from '../../aside/ErrorNotifier'

class BankDetails extends Component {
  constructor(){
    super();
    this.state = {
      data: {
        pan: '',
        aadhar: '',
        bankName: '',
        nameInBank: '',
        accountNo: '',
        ifscCode: '',
        accountType: '',
        pfNo: '',
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
    axios.post(EMPLOYEE_BANK_DETAILS, data, {withCredentials: true})
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
      pan: data.pan,
      aadhar: data.aadhar,      
      bankName: data.bankName,
      nameInBank: data.nameInBank,
      accounNo: data.accountNo,
      ifscCode: data.ifscCode,
      accountType: data.accountType,
      pfNo: data.pfNo,
    }
    if(errors.valid){
      axios.post(
        UPDATE_BANK_INFO,
        details,
        {withCredentials: true}
      )
        .then(res => {
          this.setState({
            message: 'Updated Successfully'
          })
          setTimeout(() => {
            this.props.back();
          }, 5000)
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
    const { data } = this.state
    return (
      <div>
        <h5 className="bold center">Edit Bank Information</h5>
        <Form onSubmit={this.onSubmit} className="p-3" noValidate>
          <Row>
            <Col md="6">
              <FormComponent
                labelClass="bold label-sm"
                label="PAN Card Number"
                type="text"
                name="pan"                
                placeholder="Enter a valid PAN card number"
                value={data && data.pan}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="AADHAR Card Number"
                type="text"
                name="aadhar"                
                placeholder="Enter your AADHAR card number"
                value={data && data.aadhar}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Bank Name"
                type="text"
                name="bankName"                
                placeholder="Account holder's bank name"
                value={data && data.bankName}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Name"
                type="text"
                name="nameInBank"                
                placeholder="Name as per the bank records"
                value={data && data.nameInBank}
                change={this.onChange}
                required={true}
              />              
            </Col>
            <Col md="6">
              <FormComponent
                labelClass="bold label-sm"
                label="Account Number"
                type="number"
                name="accountNo"                
                value={data && data.accountNo}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="IFSC Code"
                type="text"
                name="ifscCode"                
                value={data && data.ifscCode}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Account Type"
                type="text"
                name="accountType"                
                placeholder="Specify job role"
                value={data && data.accountType}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="PF Account Number"
                type="text"
                name="pfNo"                
                value={data && data.pfNo}
                change={this.onChange}
                required={true}
              />
            </Col>
          </Row>
          <div className="center">
            <button type="submit" className="btn center login-button white-text">Update Profile</button>
          </div>
        </Form>
        {this.state.message? <Notifier message={this.state.message} />: null}
        {this.state.error? <ErrorNotifier message={this.state.error} />: null}
      </div>
    )
  }
}
export default BankDetails;