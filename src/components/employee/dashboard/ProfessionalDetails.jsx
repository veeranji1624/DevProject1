import React, { Component } from 'react'
import axios from 'axios'
import {
  Form,
  Row,
  Col
} from 'reactstrap'
import {
  EMPLOYEE_PROFESSIONAL_INFO,
  UPDATE_EMPLOYEE_PROFESSION
} from '../../../utils/routes'
import { Validator, submitValidator, errors } from '../../common/Validator'
import FormComponent from '../../common/FormComponent'
import Notifier from '../../aside/Notifier'
import ErrorNotifier from '../../aside/ErrorNotifier'

class ProfessionalDetails extends Component {
  constructor(){
    super();
    this.state = {
      data: {
        employer: '',
        ctc: '',
        experience: '',
        qualification: '',
      },
      message: '',
      error: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.reset = this.reset.bind(this);
  }
  reset(){
    this.setState({
      data: {}
    })
  }
  componentDidMount(){
    const id = {
      empId: localStorage.getItem('id')      
    }
    axios.post(
        EMPLOYEE_PROFESSIONAL_INFO,
        id,
        {withCredentials: true}
      )
      .then(res => {
        if(res.data[0]){
          this.setState({
            data: res.data
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
      employer: data.employer,
      ctc: data.ctc,
      experience: data.experience,
      qualification: data.qualification,
    }
    if(errors.valid){
      axios.post(
        UPDATE_EMPLOYEE_PROFESSION,
        details,
        {withCredentials: true}
      )
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
        <h5 className="bold center">Professional Information</h5>
        <Form onSubmit={this.onSubmit} className="p-3" noValidate>
          <Row>
            <Col md="2"></Col>
            <Col md="8">
              <FormComponent
                labelClass="bold label-sm"
                label="Qualification"
                type="text"
                name="qualification"
                inputClass="form-control-sm"
                value={data&&data.qualification}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Years Of Experience"
                type="number"
                name="experience"
                inputClass="form-control-sm"
                value={data&&data.experience}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Offered CTC"
                type="number"
                name="ctc"
                inputClass="form-control-sm"
                value={this.state.data.ctc}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Previous Employer"
                type="text"
                name="employer"
                inputClass="form-control-sm"
                value={this.state.data.employer}
                change={this.onChange}
                required={true}
              />
              <div className="center">
                <button type="submit" className="btn login-button white-text">Update Profile</button>
              </div>
            </Col>
          </Row>
        </Form>
        {this.state.message? <Notifier message={this.state.message} />: null}
        {this.state.error? <ErrorNotifier message={this.state.error} />: null}
      </div>
    )
  }
}
export default ProfessionalDetails;