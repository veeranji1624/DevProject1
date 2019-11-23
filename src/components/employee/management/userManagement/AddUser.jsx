import React, { Component } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'
import Select from 'react-select'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import {API} from '../../../../utils/routes'
import { REGISTER_NEW_EMPLOYEE } from '../../../../utils/routes'
import Notifier from '../../../aside/Notifier'
import ErrorNotifier from '../../../aside/ErrorNotifier'


class AddUser extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      password2: '',
      mobile: '',
      firstName: '',
      middleName: '',
      lastName: '',
      dob: '',
      gender: 'Female',
      eType: 'Contract',
      designation: '',
      doj: '',
      role: '1',
      message: '',
      error: '',
      data: [],
      // selectedValue: null
       selectedOption: null
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.reset = this.reset.bind(this);
  }
  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)
    );
      // console.log(this.state.selectedOption.value)
  }; 
  componentDidMount(){
    axios.get(`${API}/role/fetch`) 
    .then(response => {
      console.log(response.data)
      this.setState({
        data : response.data
      })
      console.log(this.state.data)
    })
    .catch(error => {
      console.log(error)
    })
  }
  reset(){
    this.setState({
      email: '',
      password: '',
      password2: '',
      mobile: '',
      firstName: '',
      middleName: '',
      lastName: '',
      dob: '',
      gender: 'Female',
      eType: 'Contract',
      designation: '',
      doj: '',
      role: ''
    })
  }
  onSubmit(e){
    console.log(this.state.selectedOption)
    e.preventDefault();
      let User = {
        empType: this.state.eType,
        firstName: this.state.firstName,
        lastName: this.state.middleName,
        middleName: this.state.lastName,
        email: this.state.email,
        mobileNumber: this.state.mobile,
        dob: this.state.dob,
        genderType: this.state.gender,
        password: this.state.password,
        dateOfJoin: this.state.doj,
        designation: this.state.designation,
        primaryRole: this.state.selectedOption.value,
        empCreatorId: localStorage.getItem('id')
      }
      console.log(User);  
      axios.post(
          `${API}/employee/create`,
          User,
          {withCredentials: true}
        )
        .then(res => {          
          this.setState({message: 'Added Successfully'})
          setTimeout(() => {
            this.props.history.push('/employee/users');
          }, 2000)
        })
        .catch(err => {        
          this.setState({
            error: 'Could not create'
          })
        });
        setTimeout(() => {
          this.setState({
            message: '',
            error: ''
          })
        }, 5000);
  }

  // handleChange(e) {
  //   this.setState({
  //     selectedValue: e.target.value
  //   })
  // }
  render() {
    const { data, selectedOption } = this.state;
    // console.log(selectedOption.value)
    let options = []
    obj = {}
    for (let i = 0; i < data.length; i++) {
      var obj = {};

      obj['value'] = data[i].roleId;
      obj['label'] = data[i].roleName;
      options.push(obj)
    }
    console.log(data)
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';
    return (
      <div className={shrink}>
        <h5 className="center bold">Add Employee</h5>
          <Container className="card container-card">
            <Link to="/employee/users">
              <i
                className="material-icons pointer"
                style={{position:'absolute', top: '5px', right: '5px', color: '#C00'}}
              >cancel</i>
            </Link>
            <Form onSubmit={this.onSubmit} className="p-3">
              <Row>
              <Col md="4">
                <FormGroup>
                  <Label className="bold label-sm">Email Id</Label>
                  <Input
                    type="email"
                    name="email" 
                    className="form-control-sm"
                    value={this.state.email}
                    onChange={this.onChange}
                    placeholder="email (required)"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    className="form-control-sm"
                    value={this.state.password}
                    onChange={this.onChange}
                    placeholder="password (required)"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">Confirm Password</Label>
                  <Input
                    type="password"
                    name="password2"
                    className="form-control-sm"
                    value={this.state.password2}
                    onChange={this.onChange}
                    placeholder="Confirm password (required)"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">Mobile No.</Label>
                  <Input
                    type="number"
                    name="mobile"
                    className="form-control-sm"
                    value={this.state.mobile}
                    onChange={this.onChange}
                    placeholder="Mobile (required)"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">First Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    className="form-control-sm"
                    value={this.state.firstName}
                    onChange={this.onChange}
                    placeholder="First Name (required)"
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label className="bold label-sm">Middle Name</Label>
                  <Input
                    type="text"
                    name="middleName"
                    className="form-control-sm"
                    value={this.state.middleName}
                    onChange={this.onChange}
                    placeholder="Middle name (Required)"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    className="form-control-sm"
                    value={this.state.lastName}
                    onChange={this.onChange}
                    placeholder="Last name (required)"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">Date of Birth</Label>
                  <Input
                    type="date"
                    name="dob"
                    className="form-control-sm"
                    value={this.state.dob}
                    onChange={this.onChange}
                    placeholder="Date of birth (required)"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">Gender</Label>
                  <Input
                    type="select"
                    name="gender"
                    className="form-control-sm"
                    value={this.state.gender}
                    onChange={this.onChange}
                    required
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">Employee Type</Label>
                  <Input
                    type="select"
                    name="eType"
                    className="form-control-sm"
                    value={this.state.eType}
                    onChange={this.onChange}
                    required
                  >
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Permanent">Permanent</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label className="bold label-sm">Designation</Label>
                  <Input
                    type="text"
                    name="designation"
                    className="form-control-sm"
                    value={this.state.designation}
                    onChange={this.onChange}
                    placeholder="Designation (required)"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">Date of Join</Label>
                  <Input
                    type="date"
                    name="doj"
                    className="form-control-sm"
                    value={this.state.doj}
                    onChange={this.onChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">Primary Role</Label>
                   {/* <Input
                    type="select"
                    name="role"
                    className="form-control-sm"
                    value={this.state.role}
                    onChange={this.onChange}
                    required
                  >  */}
                  
                    {/* { data.map(item => {
                      // console.log(item.roleId)
                     <option key={item.roleId} value={item.roleId}>{item.roleId}</option>
                    })
                  } */}
                    <Select className="form-control-sm" name="options" value={selectedOption} onChange={this.handleChange} options={options} /> 
                    {/* <option value="MD">MD</option>
                     <option value="SM">SM</option>
                    <option value="OP">OP</option>
                    <option value="TE">TE</option>
                    <option value="SD">SD</option> */}
                    {/* <option value="6">Accountant</option>
                    <option value="7">HR lead</option>
                    <option value="8">Project consultant</option>
                    <option value="9">Executives</option>  */}
                   {/* </Input>  */}
                   {/* <select name="roleSearch" onChange={this.handleChange} value={selectedValue}>
                    {roleIdList}
                  </select>  */}
                </FormGroup>
              </Col>
            </Row>
            <div className="center">
              <button type="submit" className="btn mt-3 center login-button white-text">Create New Employee</button>
            </div>
          </Form>
        </Container>
        {this.state.message? <Notifier message={this.state.message} />: null}
        {this.state.error? <ErrorNotifier message={this.state.error} />: null}
      </div>
    );
  }
}
export default AddUser;
