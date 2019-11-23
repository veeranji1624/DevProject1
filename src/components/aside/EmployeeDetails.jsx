import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap'
import {API} from '../../utils/routes.js'
import { EMPLOYEE_UPDATE } from '../../utils/routes'
import Notifier from '../aside/Notifier'
import ErrorNotifier from '../aside/ErrorNotifier'

class EmployeeDetails extends Component{
  constructor(props){
    super(props);
    const {
      empId,
      empType,
      firstName,
      middleName,
      lastName,
      email,
      mobileNumber,
      genderType,
      designation,
      primaryRole,
      empCreatorId,
      projectStatus,
      percentage,
      createdOn,
      empActiveStatus,
      dob
    } = this.props.employee;
    this.state = {
      permissionlist: this.props.auth.permissionlist,
      id: empId,
      empType: empType,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      email: email,
      mobile: mobileNumber,
      gender: genderType,
      designation: designation,
      role: primaryRole,
      empCreatorId: empCreatorId,
      projectStatus: projectStatus,
      percentage: percentage,
      created: createdOn,
      status: empActiveStatus,
      dob: dob,
      edit: false,
      message: '',
      error: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps){
    if((prevProps.auth !== this.props.auth) ){
      this.setState({
     
       permissionlist: this.props.auth.permisssionlist
      })
    }
  }
  onChange(e){
    this.setState({
        [e.target.name]: e.target.value
    })
  }
  onSubmit(e){
    e.preventDefault();
    console.log(this.state.id)
    let emp = {
       empId: this.state.id,
       empType: this.state.empType,
       email: this.state.email,
       mobileNumber: this.state.mobileNumber,
       firstName: this.state.firstName,
       middleName: this.state.middleName,
       lastName: this.state.lastName,
       dob: this.state.dob,
        genderType: this.state.genderType,
       designation: this.state.designation,
       primaryRole: this.state.role, 
       empCreatorId: this.state.empCreatorId, 
       dateOfJoin: this.state.created,
       projectStatus: this.state.projectStatus,
       percentage: this.state.percentage
    }
    console.log(emp);
    axios.post(
      `${API}/employee/update`,
      emp,
      {withCredentials: true}
    )
      .then(res => {
        console.log(res.data);
        this.setState({
          message: 'Updated successfully'
        })
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
  }

  componentDidMount() {
    this.setState({
      permissionlist:this.props.auth.permissionlist
      });
  } 
  render(){
    console.log(this.state.id)
    console.log(this.props.employee);
    const { permissionlist } = this.state;

    let currentPermission;    


    for(let x in permissionlist.response.permissions) {
      if(permissionlist.response.permissions[x].groupId == "4.1") {
        currentPermission = permissionlist.response.permissions[x];
      }
      else{
        console.log('the for loop if condition is false');
      }
    }
    return(
      <Row>
        {
        !this.state.edit
        ?(<Col md="12">
          {(currentPermission.update) ?
          <div className="div">
          <i
            className="material-icons edit-button pointer mt-4"
            style={{paddingLeft: '10px'}}
            onClick={()=>this.setState({edit:!this.state.edit})}
          >
            edit
          </i></div>:null}
          <h5 className="bold pointer center pt-2">Employee Details</h5>
          <Row>
            <Col md="6">
              <h6 className="m-3">First name : 
                <span className="blue-text">
                  { this.state.firstName }
                </span>
              </h6>
              <h6 className="m-3">Middle name : 
                <span className="blue-text">
                  { this.state.middleName }
                </span>
              </h6>
              <h6 className="m-3">Last name : 
                <span className="blue-text">
                  { this.state.lastName }
                </span>
              </h6>
              <h6 className="m-3">EMail : 
                <span className="blue-text">
                  { this.state.email }
                </span>
              </h6>
              <h6 className="m-3">Mobile : 
                <span className="blue-text">
                  { this.state.mobile }
                </span>
              </h6>
              <h6 className="m-3">Gender : 
                <span className="blue-text">
                  { this.state.gender }
                </span>
              </h6>
            </Col>
            <Col md="6">
              <h6 className="m-3">Date of birth : 
                <span className="blue-text">
                  { this.state.dob }
                </span>
              </h6>
              <h6 className="m-3">Designation : 
                <span className="blue-text">
                  { this.state.designation }
                </span>
              </h6>
              <h6 className="m-3">Primary Role : 
                <span className="blue-text">
                  { this.state.role }
                </span>
              </h6>
              <h6 className="m-3">Created on : 
                <span className="blue-text">
                  { this.state.created }
                </span>
              </h6>
              <h6 className="m-3">Status : 
                <span className="blue-text">
                  { this.state.status }
                </span>
              </h6>
            </Col>
          </Row>
        </Col>)
        :(<Col md="12">
          <h5 className="bold pointer center pt-2">Update Employee</h5>
          <Form onSubmit={this.onSubmit} className="p-3">
            <Row>
              <Col md="4">
              <FormGroup>
                  <Label className="bold label-sm">Emp Type</Label>
                  <Input
                    name="empType"
                    type="text"
                    className="form-control-sm"
                    onChange={this.onChange}
                    value={this.state.empType}
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">empCreatorId</Label>
                  <Input
                    name="empCreatorId"
                    type="text"
                    className="form-control-sm"
                    onChange={this.onChange}
                    value={this.state.empCreatorId}
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">projectStatus</Label>
                  <Input
                    name="projectStatus"
                    type="text"
                    className="form-control-sm"
                    onChange={this.onChange}
                    value={this.state.projectStatus}
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">Percentage</Label>
                  <Input
                    name="percentage"
                    type="text"
                    className="form-control-sm"
                    onChange={this.onChange}
                    value={this.state.percentage}
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">First name</Label>
                  <Input
                    name="firstName"
                    type="text"
                    className="form-control-sm"
                    onChange={this.onChange}
                    value={this.state.firstName}
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">Middle name</Label>
                  <Input
                    name="middleName"
                    type="text"
                    className="form-control-sm"
                    onChange={this.onChange}
                    value={this.state.middleName}
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">Last name</Label>
                  <Input
                    name="lastName"
                    type="text"
                    className="form-control-sm"
                    onChange={this.onChange}
                    value={this.state.latName}
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">Email</Label>
                    <Input
                      name="email"
                      type="email"
                      className="form-control-sm"
                      onChange={this.onChange}
                      value={this.state.email}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label className="bold label-sm">Mobile</Label>
                    <Input
                      name="mobile"
                      type="number"
                      className="form-control-sm"
                      onChange={this.onChange}
                      value={this.state.mobile}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="bold label-sm">Gender</Label>
                    <Input
                      name="gender"
                      type="select"
                      className="form-control-sm"
                      onChange={this.onChange}
                      value={this.state.gender}
                    >
                      <option value="1">Female</option>
                      <option value="2">Male</option>
                    </Input>
                  </FormGroup>                                
                  <FormGroup>
                    <Label className="bold label-sm">Date of birth</Label>
                    <Input
                      name="dob"
                      type="date"
                      className="form-control-sm"
                      onChange={this.onChange}
                      value={this.state.dob}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="bold label-sm">Designation</Label>
                    <Input
                      name="designation"
                      type="text"
                      className="form-control-sm"
                      onChange={this.onChange}
                      value={this.state.designation}
                    />
                  </FormGroup>
                </Col>
                <Col md="4">                  
                  <FormGroup>
                    <Label className="bold label-sm">Primary Role</Label>
                    <Input
                      name="role"
                      type="text"
                      className="form-control-sm"
                      onChange={this.onChange}
                      value={this.state.role}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="bold label-sm">Status</Label>
                    <Input
                      name="status"
                      type="select"
                      className="form-control-sm"
                      onChange={this.onChange}
                      value={this.state.status}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label className="bold label-sm">Date of join</Label>
                    <Input
                      name="created"
                      type="date"
                      className="form-control-sm"
                      onChange={this.onChange}
                      value={this.state.created}
                    />
                  </FormGroup>
                </Col>
              </Row>        
                <div className="center">
                  <button
                    type="submit"
                    className="btn btn-custom"
                  >
                    Update                    
                  </button>
                </div>
            </Form>
          </Col>)}
          {this.state.message? <Notifier message={this.state.message} />: null}
          {this.state.error? <ErrorNotifier message={this.state.error} />: null}
        </Row>
      )
    }
}

EmployeeDetails.propTypes = {
  employee: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(EmployeeDetails);
