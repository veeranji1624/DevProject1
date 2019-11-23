import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Select from 'react-select';
// import CreatableSelect from 'react-select/lib/Creatable';
import axios from 'axios'
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
// import { ADD_USER_ROLE } from '../../../../utils/routes'
import Notifier from '../../../aside/Notifier'
import ErrorNotifier from '../../../aside/ErrorNotifier'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
class AddRole extends Component {
  constructor() {
    super();
    this.state = {
     rolename:'',
     roleid:'',
     description:'',
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
      rolename:'',
      roleid:'',
      description:''
    })
  }

  
  onSubmit(e){
    e.preventDefault();
      let User = {
        roleName:this.state.rolename,
        roleId:this.state.roleid,
        roleDesc:this.state.description

      }
      console.log(User);  
      axios.post(
        `${API}/role/create`,
          User,
          {withCredentials: true}
        )
        .then(res => {          
          this.setState({message: 'Added Successfully'})
        //   setTimeout(() => {
        //     this.props.history.push('employee/role1');
        //   }, 2000)
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
  
  render() {
    const { selectedOption } = this.state;
    console.log(this.state);
    let shrink;
    console.log(this.props.sidebar);
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';
    console.log(shrink);
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
          <Link to="/employee/role">
              <i
                className="material-icons pointer"
                style={{position:'absolute', top: '5px', right: '5px', color: '#C00'}}
              >cancel</i>
            </Link>
            <Form onSubmit={this.onSubmit} className="p-3">
              <Row>
              <Col md="4">
              <FormGroup>
                  <Label className="bold label-sm">Role Name</Label>
                  <Input
                    type="text"
                    name="rolename"
                    className="form-control-sm"
                    value={this.state.rolenamd}
                    onChange={this.onChange}
                    placeholder="Role Name (required)"
                    required
                  />
              </FormGroup>
              </Col>
              <Col md="4">
              <FormGroup>
                  <Label className="bold label-sm">Role Id</Label>
                  <Input
                    type="text"
                    name="roleid"
                    className="form-control-sm"
                    value={this.state.roleid}
                    onChange={this.onChange}
                    placeholder="Role Id (required)"
                    required
                  />
              </FormGroup>
              </Col>
              <Col md="4">
              <FormGroup>
                  <Label className="bold label-sm">Description</Label>
                  <Input
                    type="text"
                    name="description"
                    className="form-control-sm"
                    value={this.state.description}
                    onChange={this.onChange}
                    placeholder="Description"
                    required
                  />
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
export default AddRole;