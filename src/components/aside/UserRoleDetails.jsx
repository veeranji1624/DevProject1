import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select';
import axios from 'axios'
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap'
import { EMPLOYEE_UPDATE } from '../../utils/routes'
import Notifier from '../aside/Notifier'
import ErrorNotifier from '../aside/ErrorNotifier'
const options = [
    { value: 'Managing Director', label: 'Managing Director' },
    { value: 'Project Manager', label: 'Project Manager' },
    { value: 'Admin', label: 'Admin' },
    { value: 'HR Lead', label: 'HR Lead' },
    { value: 'Accountant', label: 'Accountant' },
    { value: 'Project Consultant', label: 'Proiject Consultant' },
  ];
class UserRoleDetails extends Component{
  constructor(props){
    super(props);
    // const {
    //   firstName,
    //   lastName,
    //   primaryrole,
    //   options,
    //   empid,
    // } = this.props.employee;
    this.state = {
      permissionlist: this.props.auth.permissionlist,
      firstName: 'Harish',
      lastName: 'B',
      primaryrole: 'SM',
      options: [
     { value: 'Managing Director', label: 'Managing Director' },
    { value: 'Project Manager', label: 'Project Manager' },
    { value: 'Admin', label: 'Admin' },
    { value: 'HR Lead', label: 'HR Lead' },
    { value: 'Accountant', label: 'Accountant' },
    { value: 'Project Consultant', label: 'Proiject Consultant' },
      ],
      empid: '1004',
      edit: false,
      message: '',
      error: '',
      selectedOption: null
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
  handleChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)
    );
    console.log(selectedOption)
  };
  onSubmit(e){
    e.preventDefault();
    let emp = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      primaryrole: this.state.primaryrole,
      optionsType:this.state.selectedOption,
      options: this.state.options,
      empid: this.state.empid
    }
    console.log(emp);
    axios.post(
      EMPLOYEE_UPDATE,
      emp,
      {withCredentials: true}
    )
      .then(res => {
        console.log(res.data);
        this.setState({
          message: 'Updated successfully'
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
    })
  }
  
  componentDidMount() {
    this.setState({
      permissionlist:this.props.auth.permissionlist
      });
  }
  render(){
    const { selectedOption, options, permissionlist } = this.state;
    console.log(selectedOption)

    let currentPermission;    


    for(let x in permissionlist.response.permissions) {
      if(permissionlist.response.permissions[x].groupId == "4.4") {
        currentPermission = permissionlist.response.permissions[x];
      }
      else{
        console.log('the for loop if condition is false');
      }
    }
    // const selectedOption1 = selectedOption.map((item) =>
    // <span>{item.value}</span>)

    const newOptions = options.map((item) =>
    <span>{item.value}</span>
);

    
   console.log(newOptions);
    console.log(this.props.employee);
    return(
      <Row>
        {
        !this.state.edit
        ?(<Col md="12">
           {(currentPermission.update) ?
          <i
            className="material-icons edit-button pointer mt-4"
            style={{paddingLeft: '10px'}}
            onClick={()=>this.setState({edit:!this.state.edit})}
          >
            edit
          </i>: null }
          <h5 className="bold pointer center pt-2">Employee Role Details</h5>
          <Row>
            <Col md="6">
              <h6 className="m-3">First name : 
                <span className="blue-text">
                  { this.state.firstName }
                </span>
              </h6>
              <h6 className="m-3">Last name : 
                <span className="blue-text">
                  { this.state.lastName }
                </span>
              </h6>
              <h6 className="m-3">Primary Role : 
                <span className="blue-text">
                  { this.state.primaryrole }
                </span>
              </h6>
              <h6 className="m-3">Secondary Role : 
                <span className="blue-text">
                  {/* {options}  */}

                  {/* { this.state.options} */}
                   {/* {options.map((item) =>
                       <span>{item.value},</span>
                  )}  */}
                  {newOptions}
                  </span>
              </h6>
              <h6 className="m-3">Emp Id : 
                <span className="blue-text">
                  { this.state.empid }
                </span>
              </h6>
            </Col>
          </Row>
        </Col>)
        :(<Col md="12">
          <h5 className="bold pointer center pt-2">Update Employee Role Details</h5>
          <Form onSubmit={this.onSubmit} className="p-3">
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label className="bold label-sm">First name:</Label>
                    {/* <span>{this.state.firstName}</span> */}
                    <Input
                      name="firstName"
                      type="text"
                      className="form-control-sm"
                      value={this.state.firstName}
                      disabled
                    />
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">Last name: </Label>
                   {/* <span>{this.state.lastName} </span> */}
                   <Input
                      name="lastName"
                      type="text"
                      className="form-control-sm"
                      value={this.state.lastName}
                      disabled
                    /> 
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">Primary Role</Label>
                    <Input
                      name="primaryrole"
                      type="select"
                      className="form-control-sm"
                      onChange={this.onChange}
                      value={this.state.primaryrole}
                    >
                    <option value="MD">MD</option>
                    <option value="SM">SM</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label className="bold label-sm">Secondary Role</Label>
                    {/* <Input
                      name="options"
                      type="Select"
                      className="form-control-sm"
                      onChange={this.onChange}
                      value={this.state.options}
                    > */}
                      <Select  defaultValue={options.map((item,index) => 
                        options[index]
                      )} name="options"  onChange={this.handleChange} options={options} isMulti/> 
                    {/* </Input> */}
                    

                  </FormGroup> 
                  <FormGroup>
                    <Label className="bold label-sm">Emp Id:</Label>
                      {/* <span>{this.state.empid}</span> */}
                      <Input
                      name="empId"
                      type="text"
                      className="form-control-sm"
                      value={this.state.empid}
                      disabled
                    /> 
                    
                      {/* <option value="1001">1001</option>
                      <option value="1002">1002</option>
                      <option value="1003">1003</option>
                      <option value="1004">1004</option>
                    </Input> */}
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

UserRoleDetails.propTypes = {
  employee: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(UserRoleDetails);
