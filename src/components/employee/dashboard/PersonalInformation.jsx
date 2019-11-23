import React, { Component } from 'react'
import axios from 'axios'
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import {
  EMPLOYEE_PERSONAL_INFO,
  UPDATE_EMPLOYEE_PERSONAL
} from '../../../utils/routes'
import { Validator, submitValidator, errors } from '../../common/Validator'
import FormComponent from '../../common/FormComponent'
import Notifier from '../../aside/Notifier'
import ErrorNotifier from '../../aside/ErrorNotifier'

class PersonalInformation extends Component {
  constructor(){
    super();
    this.state = {
      data: {
        emailId: '',
        homeContact: '',
        emerContact: '',
        contactPerson: '',
        personRelation: '',
        spouseName: '',
        spouseContact: '',
        fatherName: '',
        otherDepend: '',
        bloodGroup: '',
        maritalStatus: '',
        presentAddr: '',
        permanentAddr: ''
      },
      message: '',
      error: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount(){
    const id = {
      empId: localStorage.getItem('id')
    }
    axios.post(
        EMPLOYEE_PERSONAL_INFO,
        id,
        {withCredentials: true}
      )
      .then(res => {
        if(res.data.data[0]){
          this.setState({
            data: res.data.data[0]
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
    let {data} = this.state;
    let details;
    if(this.state.data){
      details = {
        empId: localStorage.getItem('id'),
        emailId: data.emailId,
        homeContact: data.homeContact,
        emerContact: data.emer_contact,
        contactPerson: data.contactPerson,
        personRelation: data.personRelation,
        spouseName: data.spouseName,
        spouseContact: data.spouseContact,
        fatherName: data.fatherName,
        otherDepend: data.otherDepend,
        bloodGroup: data.bloodGroup,
        martialStatus: data.maritalStatus,
        presentAddr: data.presentAddr,
        permanentAddr: data.permanentAddr
      }
      if(errors.valid){
        axios.post(
          UPDATE_EMPLOYEE_PERSONAL,
          details?details:null,
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
  }
  render() {
    const {data} = this.state;
    return (
      <div>
        <h5 className="bold center">Personal Information</h5>
        <Form onSubmit={this.onSubmit} className="p-2" noValidate>
          <Row>
            <Col md="4">
              <FormComponent
                labelClass="bold label-sm"
                label="First Name"
                type="text"
                name="firstName"
                value={data && data.firstName}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Middle Name"
                type="text"
                name="middleName"
                value={data && data.middleName}
                change={this.onChange}                
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Last Name"
                type="text"
                name="lastName"
                value={data && data.lastName}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Email"
                type="email"
                name="emailId"
                value={data && data.emailId}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Mobile Number"
                type="number"
                name="mobileNumber"
                value={data && data.mobileNumber}
                change={this.onChange}
                required={true}
              />
              <FormGroup>
                <Label className="bold label-sm">Gender</Label>
                <Input
                  type="select"
                  name="gender_type"
                  value={data && data.genderType}
                  className="form-control-sm"
                  onChange={this.onChange}
                  required
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </Input>
              </FormGroup>
              <FormComponent
                labelClass="bold label-sm"
                label="Date of birth"
                type="date"
                name="dob"
                value={data && data.dob}
                change={this.onChange}
                required={true}
              />
            </Col>
            <Col md="4">
              <FormGroup>
                <Label className="bold label-sm">Marital Status</Label>
                <Input
                  type="select"
                  name="maritalStatus"
                  value={data && data.maritalStatus}
                  className="form-control-sm"
                  onChange={this.onChange}
                  required
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </Input>
              </FormGroup>
              <FormComponent
                labelClass="bold label-sm"
                label="Spouse Name"
                type="text"
                name="spouseName"
                value={data && data.spouseName}
                change={this.onChange}                
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Spouse Contact No."
                type="number"
                name="spouseContact"
                value={data && data.spouseContact}
                change={this.onChange}                
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Home Conatct No."
                type="number"
                name="homeContact"
                value={data && data.homeContact}
                change={this.onChange}
                required={true}
              />                
              <FormComponent
                labelClass="bold label-sm"
                label="Emergency Contact Person"
                type="text"
                name="contactPerson"
                value={data && data.contactPerson}
                change={this.onChange}                
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Emergency Contact No."
                type="number"
                name="emerContact"
                value={data && data.emerContact}
                change={this.onChange}                
              />
            </Col>
            <Col md="4">
              <FormComponent
                labelClass="bold label-sm"
                label="Contact Person Relation"
                type="text"
                name="personRelation"
                value={data && data.personRelation}
                change={this.onChange}                
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Father's Name"
                type="text"
                name="fatherName"
                value={data && data.fatherName}
                change={this.onChange}
                required={true}
              />
              <FormGroup>
                <Label className="bold label-sm">Blood Group</Label>
                <Input
                  type="text"
                  name="bloodGroup"
                  value={data && data.bloodGroup}
                  className="form-control-sm"
                  onChange={this.onChange}
                  required
                >
                  <option value="A+">A Positive</option>
                  <option value="A-">A Negative</option>
                  <option value="B+">B Positive</option>
                  <option value="B-">B Positive</option>
                  <option value="AB+">AB Positive</option>
                  <option value="AB-">AB Negative</option>
                  <option value="O+">O Positive</option>
                  <option value="O-">O Negative</option>
                </Input>
              </FormGroup>
              <FormComponent
                labelClass="bold label-sm"
                label="Other Dependants"
                type="text"
                name="otherDepend"
                value={data && data.otherDepend}
                change={this.onChange}                
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Present Address"
                type="text"
                name="presentAddr"
                value={data && data.presentAddr}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Permanent Address"
                type="text"
                name="fatherName"
                value={data && data.fatherName}
                change={this.onChange}
                required={true}
              />
              <FormGroup>
                <button type="submit" className="btn login-button white-text">Update Profile</button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
        {this.state.message? <Notifier message={this.state.message} />: null}
        {this.state.error? <ErrorNotifier message={this.state.error} />: null}
      </div>
    )
  }
}
export default PersonalInformation;