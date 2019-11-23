import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Select from 'react-select';
// import CreatableSelect from 'react-select/lib/Creatable';
// import axios from 'axios'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
// import { ADD_USER_ROLE } from '../../../../utils/routes'
import Notifier from '../../../aside/Notifier'
import ErrorNotifier from '../../../aside/ErrorNotifier'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
class AddUserRole extends Component {
  constructor() {
    super();
    this.state = {
      primaryrole: 'MD',
      // secondaryRole: [],
      options:[],
      firstName: '',
      lastName: '',
      empid:'1001',
      message: '',
      error: '',
      selectedOption: null,
      // secondaryrole:''
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
  }; 
  reset(){
    this.setState({
      primaryrole: 'MD',
      // secondaryRole: [],
      secondaryrole:'',
      options:[],
      firstName: '',
      lastName: '',
      empid:'1001',
    })
  }
  onSubmit(e){
    
    e.preventDefault();
    
      let User = {
        primaryroleType: this.state.primaryrole,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        optionsType:this.state.selectedOption,
        // secondaryRoleType: this.state.secondaryRole,
        // secondaryroleType:this.state.secondaryrole,
        empidType: this.state.empid,
        empCreatorId: localStorage.getItem('id')
        

      }
      console.log(User);  
  //     axios.post(
  //         ADD_USER_ROLE,
  //         User,
  //         {withCredentials: true}
  //       )
  //       .then(res => {          
  //         this.setState({message: 'Added Successfully'})
  //         setTimeout(() => {
  //           this.props.history.push('/employee/users');
  //         }, 2000)
  //       })
  //       .catch(err => {        
  //         this.setState({
  //           error: 'Could not create'
  //         })
  //       });
  //       setTimeout(() => {
  //         this.setState({
  //           message: '',
  //           error: ''
  //         })
  //       }, 5000);
  }
  
  render() {
    const { selectedOption } = this.state;
    console.log(selectedOption)
    console.log(this.state);
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';
    // const secondaryRole = [
    //   { label: "Managing Director", value: 1 },
    //   { label: "Admin", value: 2 },
    //   { label: "HRManager", value: 3 },
    //   { label: "Project Manager", value: 4 },
    //   { label: "Accountant", value: 5 },
    //   { label: "Project Consultant", value: 6 },
    // ];
    return (
      <div className={shrink}>
        <h5 className="center bold">Add Roles</h5>
          <Container className="card container-card">
            <Link to="/employee/user/role">
              <i
                className="material-icons pointer"
                style={{position:'absolute', top: '5px', right: '5px', color: '#C00'}}
              >cancel</i>
            </Link>
            <Form onSubmit={this.onSubmit} className="p-3">
              <Row>
              <Col md="4">
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
                  <Label className="bold label-sm">Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    className="form-control-sm"
                    value={this.state.lastName}
                    onChange={this.onChange}
                    placeholder="Last Name (required)"
                    required
                  />
              </FormGroup>
              </Col>
              <Col md="4">
              <FormGroup>
                  <Label className="bold label-sm">Primary Role</Label>
                  <Input
                    type="select"
                    name="primaryrole"
                    className="form-control-sm"
                    value={this.state.primaryrole}
                    onChange={this.onChange}
                    required
                  >
                    <option value="MD">MD</option>
                    <option value="SM">SM</option>
                  </Input>
              </FormGroup>
              </Col>
              </Row>
              <Row>
                <Col md="4">
              <FormGroup>
              {/* <Label className="bold label-sm">Secondary Role</Label> */}
               {/* <Select name="secondaryrole" value={this.state.secondaryrole} onChange={this.onChange} options={secondaryRole} isMulti/> */}
              {/* <Select name="secondaryRole" options={secondaryRole} value={this.state.secondaryRoleType} 
                        onChange={opt => console.log(opt.label, opt.value)} isMulti /> */}
              {/* <CreatableSelect options={secondaryRole}
                            isClearable
                    onChange={(opt, meta) => console.log(opt, meta)} isMulti />           */}
                    <Label className="bold label-sm">Secondary Role</Label>
                    <Select className="form-control-sm" name="options" value={selectedOption} onChange={this.handleChange} options={options} isMulti/>
              
              
              </FormGroup>
              </Col>
              <Col md="4">
              <FormGroup>
                  <Label className="bold label-sm">Emp Id</Label>
                  <Input
                    type="select"
                    name="empid"
                    className="form-control-sm"
                    value={this.state.empid}
                    onChange={this.onChange}
                    required
                  >
                    <option value="1001">1001</option>
                    <option value="1002">1002</option>
                    <option value="1003">1003</option>
                    <option value="1004">1004</option>
                  </Input>
              </FormGroup>
              </Col>
            </Row>
            <div className="center">
              <button type="submit" className="btn mt-3 center login-button white-text">Create User Role</button>
            </div>
          </Form>
        </Container>
        {this.state.message? <Notifier message={this.state.message} />: null}
        {this.state.error? <ErrorNotifier message={this.state.error} />: null}
      </div>
    );
  }
}
export default AddUserRole;