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
class AddAccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
     roleId:'',
     groupId:'',
     access:'',
      create: '',
      update: '',
      view: '',
      delete: '',
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
        roleId:this.props.roleId,
        groupId:this.props.groupId,
        access:this.state.access,
        create: this.state.create,
        view: this.state.view,
        update: this.state.update,
        delete: this.state.delete

      }
      console.log(User);  
      axios.post(
        `${API}/access/create`,
          User,
          {withCredentials: true}
        )
        .then(res => {          
          this.setState({message: 'Added Successfully'})
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
    return (
      <div className={shrink}>
        <h5 className="center bold">Add Access</h5>
          <Container className="card container-card">
          <Link to="/employee/role">
              <i
                className="material-icons pointer"
                onClick={this.props.back}
                style={{position:'absolute', top: '5px', right: '5px', color: '#C00'}}
              >cancel</i>
            </Link>
            <Form onSubmit={this.onSubmit} className="p-3">
              <Row>
              <Col md="6">
              <FormGroup>
                  <Label className="bold label-sm">Role Id</Label>
                  <Input
                    type="text"
                    name="rolename"
                    className="form-control-sm"
                    value={this.props.roleId}
                    onChange={this.onChange}
                    placeholder="Role Name (required)"
                    required
                  />
              </FormGroup>
              </Col>
              <Col md="6">
              <FormGroup>
                  <Label className="bold label-sm">Group Id</Label>
                  <Input
                    type="text"
                    name="roleid"
                    className="form-control-sm"
                    value={this.props.groupId}
                    onChange={this.onChange}
                    placeholder="Role Id (required)"
                    required
                  />
              </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
              <FormGroup>
                  <Label className="bold label-sm">Access</Label>
                  <Input
                    type="boolean"
                    name="access"
                    className="form-control-sm"
                    value={this.state.access}
                    onChange={this.onChange}
                    placeholder="access (required)"
                    required
                  />
              </FormGroup>
              </Col>
              <Col md="6">
              <FormGroup>
                  <Label className="bold label-sm">Create</Label>
                  <Input
                    type="boolean"
                    name="create"
                    className="form-control-sm"
                    value={this.state.create}
                    onChange={this.onChange}
                    placeholder="Create (required)"
                    required
                  />
              </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
              <FormGroup>
                  <Label className="bold label-sm">Update</Label>
                  <Input
                    type="boolean"
                    name="update"
                    className="form-control-sm"
                    value={this.state.update}
                    onChange={this.onChange}
                    placeholder="Update (required)"
                    required
                  />
              </FormGroup>
              </Col>
              <Col md="6">
              <FormGroup>
                  <Label className="bold label-sm">View</Label>
                  <Input
                    type="boolean"
                    name="view"
                    className="form-control-sm"
                    value={this.state.view}
                    onChange={this.onChange}
                    placeholder="View (required)"
                    required
                  />
              </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
              <FormGroup>
                  <Label className="bold label-sm">Delete</Label>
                  <Input
                    type="boolean"
                    name="delete"
                    className="form-control-sm"
                    value={this.state.delete}
                    onChange={this.onChange}
                    placeholder="delete (required)"
                    required
                  />
              </FormGroup>
              </Col>
            </Row>
            <div className="center">
              <button type="submit" className="btn mt-3 center login-button white-text">Create Access</button>
            </div>
          </Form>
        </Container>
        {this.state.message? <Notifier message={this.state.message} />: null}
        {this.state.error? <ErrorNotifier message={this.state.error} />: null}
      </div>
    );
  }
}
export default AddAccess;